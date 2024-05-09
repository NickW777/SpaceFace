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
    let curTime = parseInt(curHours + "" + (curMinutes<10 ? "0"+curMinutes : curMinutes));

    const days = DAYS_OF_WEEK.map(({ value }) => value)

    let todaysTimeBlocks = blockData.Blocks[days[curDay]];    // This is the time blocks of the current day (is not updated on new day)

    for (const [startTime, endTime] of todaysTimeBlocks) {
      if (startTime <= curTime && curTime <= endTime) {
          return false;
        
        }
    }

    return true;
}