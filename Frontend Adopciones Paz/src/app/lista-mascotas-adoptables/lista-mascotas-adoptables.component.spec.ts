import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMascotasAdoptablesComponent } from './lista-mascotas-adoptables.component';

describe('ListaMascotasAdoptablesComponent', () => {
  let component: ListaMascotasAdoptablesComponent;
  let fixture: ComponentFixture<ListaMascotasAdoptablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaMascotasAdoptablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMascotasAdoptablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
