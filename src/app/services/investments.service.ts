import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvestmentsDTO } from '../dto/investment.dto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class InvestmentsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  create(investment: InvestmentsDTO) {
    return this.http.post<InvestmentsDTO>(
      `${environment.api_url}/investments`,
      investment
    );
  }

  getAll() {
    return this.http.get<InvestmentsDTO>(`${environment.api_url}/investments`);
  }

  delete(id: number) {
    return this.http.delete<InvestmentsDTO>(
      `${environment.api_url}/investments/${id}`
    );
  }

  public async actionsForError(error: any): Promise<any> {
    if (error.status === 401) {
      await localStorage.removeItem('currentUser');
      await this.router.navigate(['/login']);
      await this.toastr.error('Sua sessão expirou', 'Faça login novamente');
    } else if (error.status === -3) {
      await this.toastr.error(undefined, 'Sem conexão com a internet!');
    } else if (error.name && error.name === 'TimeoutError') {
      await this.toastr.error(
        undefined,
        'Conexão muito lenta! Tente novamente mais tarde'
      );
    } else {
      await this.toastr.error(
        undefined,
        'Ops, houve uma falha de conexão, tente novamente mais tarde'
      );
    }
  }
}
