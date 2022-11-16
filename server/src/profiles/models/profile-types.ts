import { Prisma } from '@prisma/client';

export type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  age: number | null;
  bio: string | null;
  subjects: string | null;
  edLevel: string | null;
  rate: Prisma.Decimal | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  profileUrl: string;
  userId: number;
  user: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    role: string;
  };
  _count: {
    reviews: number;
  };
};

export type ProfileWithReviewData = {
  reviewsCount: number;
  avgRating: number | null;
} & Omit<ProfileData, '_count'>;
