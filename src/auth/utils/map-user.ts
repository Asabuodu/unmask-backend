import { User } from '../schemas/user.schema';
import { SafeUserDto } from '../dto/safe-user.dto';

// Full type that includes password
type UserWithPassword = SafeUserDto & { password?: string };

export function toSafeUser(user: User): SafeUserDto {
  const { password, ...rest } = user.toObject<UserWithPassword>();
  return rest;
}
