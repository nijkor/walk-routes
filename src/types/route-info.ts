import { Tables } from "./database";

type Route = Tables<"routes">;
type Profile = Tables<"profiles">;
type Rating = Tables<"routes_ratings">;

export type RouteInfo = Route & {
  profile: Pick<Profile, "full_name" | "profile_id">;
  ratings: Pick<Rating, "user_id" | "rating" | "created_at">[];
};
