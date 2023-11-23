import {BookingType} from "./lib";

export interface FinancialMutationLinkBookingOptions {
    booking_type: BookingType,
    booking_id?: string,
    /** Both a decimal and a string ‘10,95’ are accepted. */
    price_base?: number | string,
    /** Both a decimal and a string ‘10,95’ are accepted. */
    price?: number | string,
    description?: string
    payment_batch_identifier?: string
    /** Should be a valid project id. */
    project_id?: string
}

export interface FinancialMutationUnlinkBookingOptions {
    booking_type: 'Payment' | 'LedgerAccountBooking',
    booking_id: string
}