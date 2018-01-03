package classified.Util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class DateTimeUtil {

	public Date formatBrasilian(Date date) throws ParseException{
		
		DateFormat dateFormatNeeded = new SimpleDateFormat("dd/mm/yyyy HH:MM:SS");
		String formated = dateFormatNeeded.format(date);
		Date toReturn = dateFormatNeeded.parse(formated);
		return toReturn;
		
	}
	
	public String getlongtoago(Date createdAt) {
	       
		DateFormat dateFormatNeeded = new SimpleDateFormat("MM/dd/yyyy HH:MM:SS");
        Date date = null;
        date = createdAt;
        String crdate1 = dateFormatNeeded.format(date);

        // Date Calculation
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        crdate1 = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(date);

        // get current date time with Calendar()
        Calendar cal = Calendar.getInstance();
        String currenttime = dateFormat.format(cal.getTime());

        Date CreatedAt = null;
        Date current = null;
        try {
            CreatedAt = dateFormat.parse(crdate1);
            current = dateFormat.parse(currenttime);
        } catch (java.text.ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        // Get msec from each, and subtract.
        long diff = current.getTime() - CreatedAt.getTime();
        long diffSeconds = diff / 1000;
        long diffMinutes = diff / (60 * 1000) % 60;
        long diffHours = diff / (60 * 60 * 1000) % 24;
        long diffDays = diff / (24 * 60 * 60 * 1000);

        String time = null;
        if (diffDays > 0) {
            if (diffDays == 1) {
                time = diffDays + "day ago ";
            } else {
                time = diffDays + "days ago ";
            }
        } else {
            if (diffHours > 0) {
                if (diffHours == 1) {
                    time = diffHours + "hr ago";
                } else {
                    time = diffHours + "hrs ago";
                }
            } else {
                if (diffMinutes > 0) {
                    if (diffMinutes == 1) {
                        time = diffMinutes + "min ago";
                    } else {
                        time = diffMinutes + "mins ago";
                    }
                } else {
                    if (diffSeconds > 0) {
                        time = diffSeconds + "secs ago";
                    }
                }

            }

        }
        return time;
    }
	
}
