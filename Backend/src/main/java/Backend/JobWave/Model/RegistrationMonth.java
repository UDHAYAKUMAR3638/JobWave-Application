package Backend.JobWave.Model;

import java.util.LinkedHashMap;

import lombok.Data;

@Data
public class RegistrationMonth {
    LinkedHashMap<String, Integer> months = new LinkedHashMap<>();

    public RegistrationMonth() {
        months.put("JANUARY", 0);
        months.put("FEBRUARY", 0);
        months.put("MARCH", 0);
        months.put("APRIL", 0);
        months.put("MAY", 0);
        months.put("JUNE", 0);
        months.put("JULY", 0);
        months.put("AUGUST", 0);
        months.put("SEPTEMBER", 0);
        months.put("OCTOBER", 0);
        months.put("NOVEMBER", 0);
        months.put("DECEMBER", 0);
    }
}
