import { BlockMapType } from '../../utils/ZodTypes'

const DAYS_OF_WEEK = [
    { value: 'Sun', label: 'sun' },
    { value: 'Mon', label: 'mon' },
    { value: 'Tue', label: 'tue' },
    { value: 'Wed', label: 'wed' },
    { value: 'Thu', label: 'thu' },
    { value: 'Fri', label: 'fri' },
    { value: 'Sat', label: 'sat' }
  ] as const


// Checks if a room is currently available
export function isAvailable(blockData:BlockMapType): {open:boolean, until:number} {
  
    const currentTime = new Date();
    const curDay = currentTime.getDay();
    const curHours = currentTime.getHours();
    const curMinutes = currentTime.getMinutes();
    
    // Get Current Time in correct format
    let curTime = parseInt(curHours + "" + (curMinutes<10 ? "0"+curMinutes : curMinutes));

    // Get Time Blocks of Current Day
    const days = DAYS_OF_WEEK.map(({ value }) => value);
    let todaysTimeBlocks = blockData.Blocks[days[curDay]];

    // Checks if a current time is within a class block
    // Also finds minimum next class start time
    let nextClassStart = Infinity;
    for (const [startTime, endTime] of todaysTimeBlocks) {
      if (startTime < nextClassStart && startTime > curTime) {
        nextClassStart = startTime;
      }
      if (startTime <= curTime && curTime <= endTime) {
        return {open:false, until: endTime};
      }
    }

    return {open:true, until: nextClassStart};
}