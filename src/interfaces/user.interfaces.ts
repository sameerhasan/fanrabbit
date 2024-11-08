export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_is_verified: boolean;
  customer_id: string;
  is_subscription_is_active: boolean;
  street: string;
  postal_code: string;
  city: string;
  country: string;
  company_name: string;
  business_id: string;
  tax_id: string;
  vat_id: string;
  plan_id?: string;
  plan_name?: string;
  country_code?: string;
  subscription_plan: ISubscriptionDetails;
}

export interface IUserData {
  user: IUser;
}

export interface IEditUser {
  user_id?: number | undefined;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  country_code: string;
  confirm_password?: string;
  street?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  company_name?: string | undefined | null;
  business_id?: string;
  tax_ID?: string | undefined | null;
  vat_ID?: string | undefined | null;
}

export interface ISubscriptionDetails {
  plan_name: string;
  plan_id: number;
  subscription_id: string | null;
  expired_at: string;
  created_at: string;
  is_tariff_plan_cancelled: boolean;
  messages_used: string;
  reset_messages: number;
  max_datastore: number;
  is_trial_period: boolean;
  words_limit: number;

  // TODO 
  price: number;
  price_in_czk: number;

}
