export interface Event {
  _id: string;
  title: string;
  description: string;
  category: 'Wedding' | 'Birthday' | 'Corporate' | 'Festival' | 'Other';
  image: string;
  createdAt: string;
}

export interface Admin {
  email: string;
  token: string;
}