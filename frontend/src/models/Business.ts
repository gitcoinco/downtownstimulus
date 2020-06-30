export interface IBusiness {
  id: number;
  name: string;
  owner_email: string;
  logo: string;
  short_description: string;
  history: string;
  covid_story: string;
  other_content: string;
  expenditure_details: string[];
  stripe_id: string;
  goal_amount: number;
  donation_received: number;
  current_clr_matching_amount: string;
  cover_image: string;
  main_business_image: string;
  staff_images: string[];
  business_video_link: string;
  website_link: string;
  facebook_profile_link: string;
  instagram_profile_link: string;
  saturation: boolean;
  accepting_donations: boolean;
}
