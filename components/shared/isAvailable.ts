import { start } from "repl";
import { RoomType } from "../../utils/ZodTypes";
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
export const isAvailable = (blockData:BlockMapType):boolean => {
  
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
    for (const [startTime, endTime] of todaysTimeBlocks) {
      if (startTime <= curTime && curTime <= endTime) {
          return false;
        }
    }

    return true;
}