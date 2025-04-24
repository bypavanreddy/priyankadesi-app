import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format, addDays, startOfDay, endOfDay, startOfWeek, endOfWeek, 
  startOfMonth, endOfMonth, subDays, subWeeks, subMonths, isSameDay, isWithinInterval, 
  isSameMonth, parseISO, isValid, max, min } from 'date-fns';

export interface DateRange {
  startDate: Date;
  endDate: Date;
  label?: string;
}

interface DateRangePickerProps {
  onChange: (dateRange: DateRange) => void;
  initialDateRange?: DateRange;
  maxDate?: Date;
  minDate?: Date;
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

const predefinedRanges: DateRange[] = [
  { 
    startDate: startOfDay(new Date()), 
    endDate: endOfDay(new Date()),
    label: 'Today'
  },
  { 
    startDate: startOfDay(subDays(new Date(), 1)), 
    endDate: endOfDay(subDays(new Date(), 1)),
    label: 'Yesterday'
  },
  { 
    startDate: startOfDay(subDays(new Date(), 6)), 
    endDate: endOfDay(new Date()),
    label: 'Last 7 days'
  },
  { 
    startDate: startOfDay(subDays(new Date(), 29)), 
    endDate: endOfDay(new Date()),
    label: 'Last 30 days'
  },
  { 
    startDate: startOfWeek(new Date()), 
    endDate: endOfWeek(new Date()),
    label: 'This week'
  },
  { 
    startDate: startOfMonth(new Date()), 
    endDate: endOfMonth(new Date()),
    label: 'This month'
  },
  { 
    startDate: startOfMonth(subMonths(new Date(), 1)), 
    endDate: endOfMonth(subMonths(new Date(), 1)),
    label: 'Last month'
  }
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  initialDateRange,
  maxDate,
  minDate,
  isOpen = false,
  onClose,
  isInline = false
}) => {
  const [startDate, setStartDate] = useState<Date>(
    initialDateRange?.startDate || startOfDay(new Date())
  );
  const [endDate, setEndDate] = useState<Date>(
    initialDateRange?.endDate || endOfDay(new Date())
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const [secondVisibleMonth, setSecondVisibleMonth] = useState(
    addDays(new Date(), 31)
  );
  const [activeRange, setActiveRange] = useState<string | null>(null);

  useEffect(() => {
    if (initialDateRange) {
      setStartDate(initialDateRange.startDate);
      setEndDate(initialDateRange.endDate);
      
      // Find if this matches a predefined range
      const matchingRange = predefinedRanges.find(range => 
        isSameDay(range.startDate, initialDateRange.startDate) && 
        isSameDay(range.endDate, initialDateRange.endDate)
      );
      
      if (matchingRange && matchingRange.label) {
        setActiveRange(matchingRange.label);
      } else {
        setActiveRange(null);
      }
    }
  }, [initialDateRange]);

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // If no start date selected or both dates are selected, set start date
      setStartDate(startOfDay(date));
      setEndDate(endOfDay(date));
      setActiveRange(null);
    } else {
      // If start date is selected but no end date
      if (date < startDate) {
        setStartDate(startOfDay(date));
        setEndDate(endOfDay(startDate));
      } else {
        setEndDate(endOfDay(date));
      }
      setActiveRange(null);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const isDateSelected = (date: Date) => {
    return (startDate && isSameDay(date, startDate)) || 
           (endDate && isSameDay(date, endDate));
  };

  const getDateClass = (date: Date) => {
    if (isDateSelected(date)) {
      return 'bg-purple-600 text-white';
    }
    if (isDateInRange(date)) {
      return 'bg-purple-100 text-purple-800';
    }
    if (hoverDate && startDate && !endDate) {
      if (isWithinInterval(date, { 
        start: hoverDate < startDate ? hoverDate : startDate,
        end: hoverDate < startDate ? startDate : hoverDate,
      })) {
        return 'bg-purple-50 text-purple-700';
      }
    }
    return 'text-gray-700 hover:bg-gray-100';
  };

  const nextMonth = () => {
    setVisibleMonth(addDays(visibleMonth, 31));
    setSecondVisibleMonth(addDays(secondVisibleMonth, 31));
  };

  const prevMonth = () => {
    setVisibleMonth(subDays(visibleMonth, 31));
    setSecondVisibleMonth(subDays(secondVisibleMonth, 31));
  };

  const handleRangeClick = (range: DateRange) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    if (range.label) {
      setActiveRange(range.label);
    }
  };

  const applyDateRange = () => {
    onChange({ startDate, endDate });
    if (onClose) onClose();
  };

  const renderDays = (date: Date) => {
    const days = [];
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let day = startDate;
    while (day <= endDate) {
      days.push(
        <button
          key={day.getTime()}
          onClick={() => handleDateClick(day)}
          onMouseEnter={() => setHoverDate(day)}
          onMouseLeave={() => setHoverDate(null)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm
            ${getDateClass(day)}
            ${!isSameMonth(day, date) ? 'text-gray-400' : ''}
          `}
          disabled={
            (minDate && day < minDate) ||
            (maxDate && day > maxDate)
          }
        >
          {format(day, 'd')}
        </button>
      );
      day = addDays(day, 1);
    }

    return days;
  };

  if (!isOpen && !isInline) return null;

  const datePickerContent = (
    <div className={`bg-white rounded-lg shadow-xl p-6 ${isInline ? 'w-full' : 'max-w-4xl w-full'}`}>
      {!isInline && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Select Date Range</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Predefined Ranges */}
        <div className="min-w-[200px] border-r pr-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Predefined Ranges</h3>
          <div className="space-y-2">
            {predefinedRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => handleRangeClick(range)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                  activeRange === range.label
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Calendar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center flex-1 flex justify-center space-x-8">
              <span className="font-medium">{format(visibleMonth, 'MMMM yyyy')}</span>
              <span className="font-medium">{format(secondVisibleMonth, 'MMMM yyyy')}</span>
            </div>
            <button 
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Month */}
            <div>
              <div className="grid grid-cols-7 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderDays(visibleMonth)}
              </div>
            </div>
            
            {/* Second Month */}
            <div>
              <div className="grid grid-cols-7 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderDays(secondVisibleMonth)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm">
          <span className="text-gray-600">Selected Range: </span>
          <span className="font-medium">
            {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
          </span>
        </div>
        <button
          onClick={applyDateRange}
          className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
        >
          Apply
        </button>
      </div>
    </div>
  );

  if (isInline) {
    return datePickerContent;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {datePickerContent}
    </div>
  );
};

export default DateRangePicker; 