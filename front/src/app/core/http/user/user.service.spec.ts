import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './user.service';
import { Users } from 'src/app/types/users.types';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  // Mock data
  const mockUsers: Users[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, nombre: 'Ana García', email: 'ana.garcia@example.com' }
  ];

  const mockUser: Users = {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getAll().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${service['URL']}/getAll/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get user by id', () => {
    service.getById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['URL']}/getById/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a user', () => {
    service.create(mockUser).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({});
  });

  it('should update a user', () => {
    service.update(1, mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['URL']}/update/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

  it('should delete a user', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
