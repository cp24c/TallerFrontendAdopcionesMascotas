import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMascotasAdoptadasComponent } from './lista-mascotas-adoptadas.component';

describe('ListaMascotasAdoptadasComponent', () => {
  let component: ListaMascotasAdoptadasComponent;
  let fixture: ComponentFixture<ListaMascotasAdoptadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaMascotasAdoptadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMascotasAdoptadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
