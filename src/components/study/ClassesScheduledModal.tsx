'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TT, HUE, UNIVERSITY_HOLIDAYS_2026 } from '@/data/schedule';
import { UniversityHoliday } from '@/types/syllabus';
import { useModalA11y } from './useModalA11y';

interface ClassesScheduledModalProps {
  open: boolean;
  labGroup: 'G1' | 'G2';
  onChangeLabGroup: (g: 'G1' | 'G2') => void;
  onClose: () => void;
}

interface ActiveClassInfo {
  status: 'running' | 'break' | 'before' | 'after' | 'sunday' | 'holiday';
  subjectCode?: string;
  subjectLabel?: string;
  timeSlot?: string;
  minutesRemaining?: number;
  nextClass?: string;
  nextClassTime?: string;
  holidayName?: string;
  dayIndex: number; // 0=Mon, ..., 5=Sat, -1=Sun
  slotIndex: number; // 0..4, or -1
}

export const ClassesScheduledModal: React.FC<ClassesScheduledModalProps> = ({
  open,
  labGroup,
  onChangeLabGroup,
  onClose,
}) => {
  const modalRef = useModalA11y(open, onClose);
  const [activeTab, setActiveTab] = useState<'timetable' | 'holidays'>('timetable');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [simDay, setSimDay] = useState<number>(0); // 0=Mon, 1=Tue, ..., 5=Sat
  const [simTimeMinutes, setSimTimeMinutes] = useState<number>(630); // 10:30 AM = 630 mins
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  // Update real-time clock every 30 seconds
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [open]);

  // Determine active class based on real-time clock or simulation mode
  const activeClass = useMemo<ActiveClassInfo>(() => {
    const now = currentTime;
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayYMD = `${yyyy}-${mm}-${dd}`;

    // Check if today is a university holiday
    const matchedHoliday = UNIVERSITY_HOLIDAYS_2026.find(
      (h) => todayYMD >= h.startDate && todayYMD <= h.endDate
    );

    let dayIdx: number;
    let mins: number;

    if (simulationMode) {
      dayIdx = simDay;
      mins = simTimeMinutes;
    } else {
      const jsDay = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
      if (jsDay === 0) {
        return {
          status: 'sunday',
          dayIndex: -1,
          slotIndex: -1,
        };
      }
      dayIdx = jsDay - 1; // 0=Mon, 5=Sat
      mins = now.getHours() * 60 + now.getMinutes();

      if (matchedHoliday) {
        return {
          status: 'holiday',
          holidayName: `${matchedHoliday.name} (${matchedHoliday.englishName})`,
          dayIndex: dayIdx,
          slotIndex: -1,
        };
      }
    }

    // Class timetable time intervals (in minutes from midnight)
    // Slot 0: 10:00 - 12:00 (600 - 720 mins, 2 hours)
    // Slot 1: 12:00 - 13:00 (720 - 780 mins, 1 hour)
    // Break : 13:00 - 14:00 (780 - 840 mins, 1 hour)
    // Slot 2: 14:00 - 15:00 (840 - 900 mins, 1 hour)
    // Slot 3: 15:00 - 16:00 (900 - 960 mins, 1 hour)
    // Slot 4: 16:00 - 17:00 (960 - 1020 mins, 1 hour)

    if (mins < 600) {
      // Before 10:00 AM
      const firstClass = TT.grid[dayIdx]?.[0];
      return {
        status: 'before',
        nextClass: firstClass?.l,
        nextClassTime: '10:00 AM',
        dayIndex: dayIdx,
        slotIndex: -1,
      };
    }

    if (mins >= 1020) {
      // After 5:00 PM
      return {
        status: 'after',
        dayIndex: dayIdx,
        slotIndex: -1,
      };
    }

    // Lunch break: 1:00 PM - 2:00 PM (780 - 840)
    if (mins >= 780 && mins < 840) {
      const nextClass = TT.grid[dayIdx]?.[2];
      return {
        status: 'break',
        minutesRemaining: 840 - mins,
        nextClass: nextClass?.l,
        nextClassTime: '2:00 PM',
        dayIndex: dayIdx,
        slotIndex: -1,
      };
    }

    let slotIdx = -1;
    let slotEndMins = 0;
    let slotLabel = '';

    if (mins >= 600 && mins < 720) {
      slotIdx = 0;
      slotEndMins = 720;
      slotLabel = '10:00 AM – 12:00 PM';
    } else if (mins >= 720 && mins < 780) {
      slotIdx = 1;
      slotEndMins = 780;
      slotLabel = '12:00 PM – 1:00 PM';
    } else if (mins >= 840 && mins < 900) {
      slotIdx = 2;
      slotEndMins = 900;
      slotLabel = '2:00 PM – 3:00 PM';
    } else if (mins >= 900 && mins < 960) {
      slotIdx = 3;
      slotEndMins = 960;
      slotLabel = '3:00 PM – 4:00 PM';
    } else if (mins >= 960 && mins < 1020) {
      slotIdx = 4;
      slotEndMins = 1020;
      slotLabel = '4:00 PM – 5:00 PM';
    }

    const currentCell = TT.grid[dayIdx]?.[slotIdx];

    return {
      status: 'running',
      subjectCode: currentCell?.k,
      subjectLabel: currentCell?.l,
      timeSlot: slotLabel,
      minutesRemaining: Math.max(1, slotEndMins - mins),
      dayIndex: dayIdx,
      slotIndex: slotIdx,
    };
  }, [currentTime, simulationMode, simDay, simTimeMinutes]);

  // Filter university holidays
  const filteredHolidays = useMemo(() => {
    return UNIVERSITY_HOLIDAYS_2026.filter((h) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.daysDisplay.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (monthFilter === 'all') return true;
      const holidayMonth = h.startDate.split('-')[1];
      return holidayMonth === monthFilter;
    });
  }, [searchQuery, monthFilter]);

  // Find next upcoming holiday
  const upcomingHoliday = useMemo(() => {
    const now = currentTime;
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayYMD = `${yyyy}-${mm}-${dd}`;

    return UNIVERSITY_HOLIDAYS_2026.find((h) => h.startDate >= todayYMD) || UNIVERSITY_HOLIDAYS_2026[0];
  }, [currentTime]);

  if (!open) return null;

  return (
    <div id="modal" ref={modalRef} role="dialog" aria-modal="true" aria-label="Classes Scheduled" className="on">
      <div className="mw max-w-4xl max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="mh pb-3 border-b-2 border-ink">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accentRed animate-ping" />
              <h2 className="font-hand text-3xl font-bold text-ink">Classes Scheduled &amp; University Calendar</h2>
            </div>
            <p className="text-sm text-dim mt-1 font-sans">
              Room 13 Weekly Timetable (w.e.f. 28.09.26) · Official 2026 University Holiday Calendar
            </p>
          </div>
          <button type="button" className="btn" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-ink/30 px-1 pt-3 pb-2 bg-paper gap-2 flex-wrap">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1.5 rounded-md font-hand text-base font-bold transition-all border ${
                activeTab === 'timetable'
                  ? 'bg-ink text-paper border-ink shadow-sm'
                  : 'bg-paper text-ink border-ink/30 hover:bg-gold/15'
              }`}
            >
              📅 Weekly Timetable &amp; Running Classes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('holidays')}
              className={`px-3 py-1.5 rounded-md font-hand text-base font-bold transition-all border ${
                activeTab === 'holidays'
                  ? 'bg-ink text-paper border-ink shadow-sm'
                  : 'bg-paper text-ink border-ink/30 hover:bg-gold/15'
              }`}
            >
              🏛️ University Holidays 2026 ({UNIVERSITY_HOLIDAYS_2026.length})
            </button>
          </div>

          {activeTab === 'timetable' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-dim">Lab Group:</span>
              <div className="seg inline-flex border border-ink/40 rounded p-0.5 bg-paper">
                <button
                  type="button"
                  onClick={() => onChangeLabGroup('G1')}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${labGroup === 'G1' ? 'bg-ink text-paper' : 'text-dim hover:text-ink'}`}
                >
                  G1
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLabGroup('G2')}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${labGroup === 'G2' ? 'bg-ink text-paper' : 'text-dim hover:text-ink'}`}
                >
                  G2
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: WEEKLY TIMETABLE & RUNNING CLASSES */}
          {activeTab === 'timetable' && (
            <div className="space-y-4">
              {/* LIVE CLASS STATUS BANNER */}
              <div className="p-3.5 rounded-lg border-[1.5px] border-ink bg-paper shadow-sketchy">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    {activeClass.status === 'running' ? (
                      <span className="flex h-3.5 w-3.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentRed opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accentRed" />
                      </span>
                    ) : (
                      <span className="h-3 w-3 rounded-full bg-dim inline-block" />
                    )}

                    <div>
                      {activeClass.status === 'running' && (
                        <div className="font-sans">
                          <span className="text-xs font-bold uppercase tracking-wider text-accentRed font-mono">
                            ● CLASS RUNNING RIGHT NOW (ROOM 13)
                          </span>
                          <h4 className="font-hand text-2xl font-bold text-ink leading-tight">
                            {activeClass.subjectLabel} · {activeClass.timeSlot}
                          </h4>
                          <p className="text-xs text-dim">
                            Approximately {activeClass.minutesRemaining} minutes remaining in this class slot.
                          </p>
                        </div>
                      )}

                      {activeClass.status === 'break' && (
                        <div className="font-sans">
                          <span className="text-xs font-bold uppercase tracking-wider text-gold font-mono">
                            ☕ LUNCH BREAK (1:00 PM – 2:00 PM)
                          </span>
                          <h4 className="font-hand text-xl font-bold text-ink">
                            Next Class: {activeClass.nextClass} at {activeClass.nextClassTime}
                          </h4>
                          <p className="text-xs text-dim">
                            Break ends in ~{activeClass.minutesRemaining} minutes.
                          </p>
                        </div>
                      )}

                      {activeClass.status === 'before' && (
                        <div className="font-sans">
                          <span className="text-xs font-bold uppercase tracking-wider text-dim font-mono">
                            ⏰ MORNING PREPARATION
                          </span>
                          <h4 className="font-hand text-xl font-bold text-ink">
                            First Class: {activeClass.nextClass} starts at {activeClass.nextClassTime} (Room 13)
                          </h4>
                        </div>
                      )}

                      {activeClass.status === 'after' && (
                        <div className="font-sans">
                          <span className="text-xs font-bold uppercase tracking-wider text-teal font-mono">
                            ✓ CLASSES COMPLETED FOR TODAY
                          </span>
                          <h4 className="font-hand text-xl font-bold text-ink">
                            All scheduled classes for today have ended. Time to revise!
                          </h4>
                        </div>
                      )}

                      {activeClass.status === 'sunday' && (
                        <div className="font-sans">
                          <span className="text-xs font-bold uppercase tracking-wider text-gold font-mono">
                            🌴 SUNDAY
                          </span>
                          <h4 className="font-hand text-xl font-bold text-ink">
                            College is closed today. Weekly revision and formula practice day!
                          </h4>
                        </div>
                      )}

                      {activeClass.status === 'holiday' && (
                        <div className="font-sans">
                          <span className="text-xs font-bold uppercase tracking-wider text-accentRed font-mono">
                            🎉 UNIVERSITY HOLIDAY TODAY
                          </span>
                          <h4 className="font-hand text-xl font-bold text-ink">
                            {activeClass.holidayName} · College Closed
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Simulator Toggle */}
                  <div className="flex items-center gap-2 shrink-0 border border-ink/20 rounded-md p-1.5 bg-paper2/60">
                    <button
                      type="button"
                      onClick={() => setSimulationMode((s) => !s)}
                      className={`text-xs px-2 py-1 rounded font-mono font-bold transition-colors ${
                        simulationMode ? 'bg-accentRed text-paper' : 'bg-paper text-dim hover:text-ink'
                      }`}
                    >
                      {simulationMode ? 'Simulating' : 'Preview Time'}
                    </button>
                    {simulationMode && (
                      <div className="flex items-center gap-1.5">
                        <select
                          value={simDay}
                          onChange={(e) => setSimDay(parseInt(e.target.value, 10))}
                          className="text-xs border border-ink/40 rounded px-1.5 py-0.5 bg-paper font-mono"
                        >
                          {TT.days.map((d, idx) => (
                            <option key={d} value={idx}>{d}</option>
                          ))}
                        </select>
                        <select
                          value={simTimeMinutes}
                          onChange={(e) => setSimTimeMinutes(parseInt(e.target.value, 10))}
                          className="text-xs border border-ink/40 rounded px-1.5 py-0.5 bg-paper font-mono"
                        >
                          <option value={630}>10:30 AM (Slot 1)</option>
                          <option value={750}>12:30 PM (Slot 2)</option>
                          <option value={800}>1:20 PM (Lunch Break)</option>
                          <option value={860}>2:20 PM (Slot 3)</option>
                          <option value={920}>3:20 PM (Slot 4)</option>
                          <option value={980}>4:20 PM (Slot 5)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* TIMETABLE TABLE */}
              <div className="overflow-x-auto border-2 border-ink rounded-lg shadow-sketchy bg-paper">
                <table className="w-full text-center text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-paper2 border-b-2 border-ink text-sm font-sans font-bold">
                      <th className="p-2.5 border-r-2 border-ink text-left w-20">Day</th>
                      <th colSpan={2} className={`p-2.5 border-r border-ink ${activeClass.dayIndex >= 0 && activeClass.slotIndex === 0 ? 'bg-gold/25 font-bold text-accentRed' : ''}`}>
                        10:00–12:00 (2h)
                      </th>
                      <th className={`p-2.5 border-r border-ink ${activeClass.dayIndex >= 0 && activeClass.slotIndex === 1 ? 'bg-gold/25 font-bold text-accentRed' : ''}`}>
                        12:00–1:00
                      </th>
                      <th className={`p-2.5 border-r border-ink bg-paper2/80 text-dim ${activeClass.status === 'break' ? 'bg-gold/30 font-bold text-accentRed' : ''}`}>
                        1:00–2:00
                      </th>
                      <th className={`p-2.5 border-r border-ink ${activeClass.dayIndex >= 0 && activeClass.slotIndex === 2 ? 'bg-gold/25 font-bold text-accentRed' : ''}`}>
                        2:00–3:00
                      </th>
                      <th className={`p-2.5 border-r border-ink ${activeClass.dayIndex >= 0 && activeClass.slotIndex === 3 ? 'bg-gold/25 font-bold text-accentRed' : ''}`}>
                        3:00–4:00
                      </th>
                      <th className={`p-2.5 ${activeClass.dayIndex >= 0 && activeClass.slotIndex === 4 ? 'bg-gold/25 font-bold text-accentRed' : ''}`}>
                        4:00–5:00
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TT.grid.map((row, dIdx) => {
                      const isTodayRow = activeClass.dayIndex === dIdx;
                      let slotCounter = 0;

                      return (
                        <tr
                          key={dIdx}
                          className={`border-b border-ink/30 transition-colors ${
                            isTodayRow ? 'bg-gold/5 font-semibold' : ''
                          }`}
                        >
                          <th className={`p-2.5 border-r-2 border-ink font-hand text-base font-bold text-left ${
                            isTodayRow ? 'bg-gold/20 text-accentRed' : 'bg-paper'
                          }`}>
                            <div className="flex items-center gap-1.5">
                              {isTodayRow && <span className="w-1.5 h-1.5 rounded-full bg-accentRed shrink-0" />}
                              <span>{TT.days[dIdx]}</span>
                            </div>
                          </th>

                          {row.map((cell, cIdx) => {
                            const span = cell.h || 1;
                            const isSlotActive = isTodayRow && activeClass.slotIndex === cIdx;
                            const isGroupOff = cell.g && cell.g !== labGroup && cell.g !== 'G1 & G2';
                            const isFree = cell.k === 'x' || cell.k === 'lib';
                            const showBreakCol = slotCounter === 3 && dIdx === 0;
                            slotCounter += span;

                            return (
                              <React.Fragment key={cIdx}>
                                {showBreakCol && (
                                  <td
                                    rowSpan={6}
                                    className={`border-r border-ink/40 p-1 font-mono text-xs font-bold text-dim bg-paper2/50 ${
                                      activeClass.status === 'break' ? 'bg-gold/30 text-accentRed border-2 border-accentRed' : ''
                                    }`}
                                  >
                                    <div className="writing-mode-vertical rotate-180 tracking-widest uppercase">
                                      LUNCH BREAK (1–2)
                                    </div>
                                  </td>
                                )}

                                <td
                                  colSpan={span}
                                  className={`p-2.5 border-r border-ink/30 relative transition-all ${
                                    isSlotActive
                                      ? 'ring-2 ring-accentRed bg-accentRed/15 font-bold text-ink shadow-inner z-10'
                                      : isGroupOff
                                      ? 'opacity-35 bg-paper2/40'
                                      : isFree
                                      ? 'bg-paper2/25'
                                      : 'hover:bg-gold/10'
                                  }`}
                                  style={{ borderLeftColor: HUE[cell.k] || HUE.x }}
                                >
                                  {isSlotActive && (
                                    <span className="absolute -top-2 right-1 px-1.5 py-0.5 rounded-full text-xs font-mono font-bold bg-accentRed text-paper shadow-sm animate-pulse">
                                      RUNNING
                                    </span>
                                  )}
                                  <div className="font-hand text-base leading-tight font-bold text-ink">
                                    {cell.l}
                                  </div>
                                  {cell.g && (
                                    <span className="text-xs font-mono text-dim block mt-0.5">
                                      Batch {cell.g} ({span * 60}m)
                                    </span>
                                  )}
                                </td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Subject Color Legend */}
              <div className="p-3 bg-paper rounded-lg border border-dashed border-ink/30">
                <div className="text-xs font-mono uppercase tracking-wider text-dim font-bold mb-1.5">
                  Subject Color Reference (Group A Syllabus · Room 13):
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(HUE).map(([k, col]) => (
                    <div key={k} className="flex items-center gap-1.5 text-xs font-hand">
                      <span className="w-3 h-3 rounded-full border border-ink/40" style={{ backgroundColor: col }} />
                      <span className="capitalize">{k === 'x' ? 'Elective / Other' : k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 2026 UNIVERSITY HOLIDAY CALENDAR */}
          {activeTab === 'holidays' && (
            <div className="space-y-4">
              {/* University Header Notification Badge */}
              <div className="p-3.5 bg-paper rounded-lg border-[1.5px] border-ink shadow-sketchy">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <span className="text-xs font-bold tracking-[0.14em] uppercase text-accentRed font-mono block">
                      OFFICIAL NOTIFICATION · 2026 CALENDAR
                    </span>
                    <h3 className="font-hand text-2xl font-bold text-ink mt-0.5">
                      विश्वविद्यालय · अवकाश-तालिका २०२६
                    </h3>
                    <p className="text-xs text-dim font-sans mt-0.5">
                      राजकीय अभियंत्रण महाविद्यालयों के शिक्षकों एवं छात्र-छात्राओं हेतु वर्ष २०२६ के लिए अवकाश-तालिका (ज्ञापांक: 1029 / 2025)
                    </p>
                  </div>

                  {upcomingHoliday && (
                    <div className="p-2.5 rounded border border-ink/30 bg-gold/10 text-right font-sans shrink-0">
                      <span className="text-xs font-mono uppercase tracking-wider text-dim block">
                        Upcoming Holiday:
                      </span>
                      <strong className="text-sm font-hand font-bold text-accentRed block">
                        {upcomingHoliday.name}
                      </strong>
                      <span className="text-xs text-dim font-mono">
                        {upcomingHoliday.daysDisplay} ({upcomingHoliday.dayOfWeek.split(' ')[0]})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Search & Month Filter Toolbar */}
              <div className="flex items-center justify-between gap-2 flex-wrap bg-paper p-2.5 rounded-lg border border-ink/30">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <span className="text-xs text-dim font-mono">Search:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search holiday name, festival, date..."
                    className="flex-1 text-xs px-2.5 py-1.5 rounded border border-ink/40 bg-paper2 font-sans focus:outline-none focus:ring-1 focus:ring-ink"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-dim hover:text-ink font-mono px-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
                  <span className="text-dim text-xs">Month:</span>
                  {[
                    ['all', 'All'],
                    ['01', 'Jan'],
                    ['02', 'Feb'],
                    ['03', 'Mar'],
                    ['04', 'Apr'],
                    ['05', 'May'],
                    ['06', 'Jun'],
                    ['08', 'Aug'],
                    ['09', 'Sep'],
                    ['10', 'Oct'],
                    ['11', 'Nov'],
                    ['12', 'Dec'],
                  ].map(([mVal, mLabel]) => (
                    <button
                      key={mVal}
                      type="button"
                      onClick={() => setMonthFilter(mVal)}
                      className={`px-2 py-0.5 rounded border ${
                        monthFilter === mVal
                          ? 'bg-ink text-paper border-ink font-bold'
                          : 'bg-paper text-dim border-ink/30 hover:bg-gold/15'
                      }`}
                    >
                      {mLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Holiday List Table */}
              <div className="border-[1.5px] border-ink rounded-lg overflow-x-auto shadow-sketchy bg-paper">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-paper2 border-b-2 border-ink font-sans text-sm font-bold">
                      <th className="p-2.5 border-r border-ink w-10 text-center">क्र०</th>
                      <th className="p-2.5 border-r border-ink">अवकाश का नाम (Holiday Name)</th>
                      <th className="p-2.5 border-r border-ink">तिथि (Date Range)</th>
                      <th className="p-2.5 border-r border-ink">दिन (Day of Week)</th>
                      <th className="p-2.5 text-center w-24">अवकाश (दिन)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHolidays.map((h) => {
                      const isMultiDay = h.totalDays > 1;

                      return (
                        <tr
                          key={h.id}
                          className="border-b border-ink/20 hover:bg-gold/10 transition-colors"
                        >
                          <td className="p-2.5 border-r border-ink/30 text-center font-mono font-bold text-dim">
                            {h.id}
                          </td>
                          <td className="p-2.5 border-r border-ink/30">
                            <div className="font-hand text-base font-bold text-ink">
                              {h.name}
                            </div>
                            <div className="text-xs text-dim font-sans">
                              {h.englishName}
                            </div>
                            {h.note && (
                              <div className="text-xs text-accentRed font-mono mt-0.5 font-medium">
                                * {h.note}
                              </div>
                            )}
                          </td>
                          <td className="p-2.5 border-r border-ink/30 font-mono font-medium text-ink">
                            {h.daysDisplay}
                          </td>
                          <td className="p-2.5 border-r border-ink/30 font-sans text-ink/90">
                            {h.dayOfWeek}
                          </td>
                          <td className="p-2.5 text-center">
                            <span
                              className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                                isMultiDay
                                  ? 'bg-accentRed/15 text-accentRed border border-accentRed/40'
                                  : 'bg-gold/20 text-ink border border-ink/30'
                              }`}
                            >
                              {h.totalDays < 10 ? `0${h.totalDays}` : h.totalDays} दिन
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-paper2 font-bold font-hand text-base border-t-2 border-ink">
                      <td colSpan={4} className="p-2.5 text-right border-r border-ink">
                        कुल अवकाश के कुल दिनों की संख्या (Total University Holidays):
                      </td>
                      <td className="p-2.5 text-center font-mono text-accentRed font-bold text-sm">
                        67 + 08 रविवार
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Official Notes Footer */}
              <div className="p-3 bg-paper rounded border border-dashed border-ink/30 text-xs font-sans text-dim space-y-1">
                <p><strong>टिप्पणी:</strong></p>
                <p>1. मुस्लिम त्योहारों में चाँद के दृष्टिगोचर होने के अनुसार अवकाश की तिथि में तत्संबंधी सरकारी आदेशानुसार परिवर्तन हो सकता है।</p>
                <p>2. अतिरिक्त अवकाश सरकारी आदेशानुसार देय होगा।</p>
                <p className="pt-1 text-xs font-mono text-ink">
                  आदेशानुसार: कुलसचिव, विश्वविद्यालय प्रशासन
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
