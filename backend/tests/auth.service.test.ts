import { AuthService } from '../src/modules/auth/auth.service';
import { UserRepository } from '../src/modules/user/user.repository';
import { hashPassword, comparePassword } from '../src/utils/bcrypt';
import { signToken } from '../src/utils/jwt';

jest.mock('../src/modules/user/user.repository');
jest.mock('../src/utils/bcrypt');
jest.mock('../src/utils/jwt');

const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;
const mockComparePassword = comparePassword as jest.MockedFunction<typeof comparePassword>;
const mockSignToken = signToken as jest.MockedFunction<typeof signToken>;

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepo = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService();
    (authService as any).repo = mockUserRepo;
    mockHashPassword.mockResolvedValue('hashedpass');
    mockComparePassword.mockResolvedValue(true);
    mockSignToken.mockReturnValue('token');
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = { name: 'John', email: 'john@example.com', password: 'hashedpass' };
      mockUserRepo.findByEmail.mockResolvedValue(null);
      mockUserRepo.create.mockResolvedValue(userData as any);

      const result = await authService.register('John', 'john@example.com', 'password');

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('john@example.com');
      expect(mockUserRepo.create).toHaveBeenCalledWith({ name: 'John', email: 'john@example.com', password: 'hashedpass' });
      expect(result).toEqual(userData);
    });

    it('should throw error if user already exists', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ _id: '1', email: 'john@example.com' } as any);

      await expect(authService.register('John', 'john@example.com', 'password')).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const user = { _id: '1', email: 'john@example.com', password: 'hashedpass' };
      mockUserRepo.findByEmail.mockResolvedValue(user as any);

      const result = await authService.login('john@example.com', 'password');

      expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('john@example.com');
      expect(result).toBe('token');
    });

    it('should throw error for invalid credentials', async () => {
      mockUserRepo.findByEmail.mockResolvedValue(null);

      await expect(authService.login('john@example.com', 'password')).rejects.toThrow('Invalid credentials');
    });
  });
});