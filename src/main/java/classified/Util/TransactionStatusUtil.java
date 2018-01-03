package classified.Util;

public enum TransactionStatusUtil {
	
	INITIATED("AGUARDANDO", 0),

    WAITING_PAYMENT("EM PROCESSAMENTO", 1),

    IN_ANALYSIS("EM ANÁLISE", 2),

    PAID("CONFIRMADO", 3),

    AVAILABLE("DISPONÍVEL", 4),

    IN_DISPUTE("EM DISPUTA", 5),

    REFUNDED("VALOR DEVOLVIDO", 6),

    CANCELLED("CANCELADA", 7),

    SELLER_CHARGEBACK("VALOR CONTESTADO (DEVOLVIDO)", 8),

    CONTESTATION("VALOR CONTESTADO (BLOQUEADO)", 9),

    UNKNOWN_STATUS("STATUS DESCONHECIDO", -1);

    /**
     * Enum description
     */
    private String description;

    /**
     * Enum value
     */
    private Integer value;

    /**
     * Initializes a newly created enum constant of this type with the specified arguments
     * 
     * @param description
     *            the description of the enum constant
     * @param value
     *            the value of the enum constant
     */
    TransactionStatusUtil(String description, Integer value) {
        this.description = description;
        this.value = value;
    }

    /**
     * Returns the enum constant of this type with the specified value. If a given value are not recognized return a
     * generic enum constant <code>UNKNOWN_STATUS</code>
     * 
     * @param value
     *            the value of the enum constant to be returned
     * @return the enum constant from a given value
     */
    public static TransactionStatusUtil fromValue(Integer value) {

        for (TransactionStatusUtil transactionStatus : values()) {
            if (transactionStatus.value.equals(value)) {
                return transactionStatus;
            }
        }

        UNKNOWN_STATUS.setValue(value);
        return UNKNOWN_STATUS;

    }
    
    public static String getDescription(String value) {

    	switch (value) {
    	
    	case "INITIATED":
    		return INITIATED.description;
    	case "WAITING_PAYMENT":
    		return WAITING_PAYMENT.description;
    	case "IN_ANALYSIS":
    		return IN_ANALYSIS.description;
    	case "PAID":
    		return PAID.description;
    	case "AVAILABLE":
    		return AVAILABLE.description;
    	case "IN_DISPUTE":
    		return IN_DISPUTE.description;
    	case "REFUNDED":
    		return REFUNDED.description;
    	case "CANCELLED":
    		return CANCELLED.description;
    	case "SELLER_CHARGEBACK":
    		return SELLER_CHARGEBACK.description;
    	case "CONTESTATION":
    		return CONTESTATION.description;
    	case "UNKNOWN_STATUS":
    		return UNKNOWN_STATUS.description;
    	
    	}
    	
    	return UNKNOWN_STATUS.description;
    }

    /**
     * @return the enum constant description
     */
    public String getDescription() {
        return this.description;
    }

    /**
     * @param description
     *            the description for this enum constant
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the enum constant value
     */
    public Integer getValue() {
        return this.value;
    }

    /**
     * @param value
     *            the value for this enum constant
     */
    public void setValue(Integer value) {
        this.value = value;
    }

}
