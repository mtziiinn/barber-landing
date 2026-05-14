"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimeStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  serviceDuration: number;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function generateTimeSlots(duration: number): string[] {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 20;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const endMinute = minute + duration;
      const endHourAdjusted = hour + Math.floor(endMinute / 60);

      if (
        endHourAdjusted < endHour ||
        (endHourAdjusted === endHour && endMinute % 60 === 0)
      ) {
        slots.push(
          `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        );
      }
    }
  }

  return slots;
}

export function DateTimeStep({
  selectedDate,
  selectedTime,
  serviceDuration,
  onDateSelect,
  onTimeSelect,
  onContinue,
  onBack,
}: DateTimeStepProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const timeSlots = generateTimeSlots(serviceDuration);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();

    // Disable Sundays and past dates
    if (dayOfWeek === 0) return true;
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      return true;

    return false;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Escolha data e horario</h2>
          <p className="text-muted-foreground text-sm">
            Selecione o melhor dia e hora para voce
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-background border border-border rounded-xl p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-bold">
              {MONTHS[currentMonth]} {currentYear}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the first day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDateDisabled(day);
              const selected = isDateSelected(day);

              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() =>
                    onDateSelect(new Date(currentYear, currentMonth, day))
                  }
                  className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                    disabled
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : selected
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <h3 className="font-bold mb-3">
            {selectedDate
              ? `Horarios para ${selectedDate.getDate()} de ${MONTHS[selectedDate.getMonth()]}`
              : "Selecione uma data primeiro"}
          </h3>

          {selectedDate ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-75 overflow-y-auto pr-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-50 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground text-sm">
                Escolha uma data no calendario
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Continue button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={onContinue}
          disabled={!selectedDate || !selectedTime}
          className="neon-border"
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
