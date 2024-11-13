import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateDocument, Document, UpdateDocument } from "../interfaces/document";
import {
  BusinessProfile,
  UpdateBusinessProfile,
} from "../interfaces/business.profile";
import { Audit } from "../interfaces/audit";
import { IncidentConfiguration, UpdateIncidentConfiguration } from "../interfaces/incident.configuration";
import { EmailConfiguration, UpdateEmailConfiguration } from "../interfaces/emal.configuration";
import { CreateSocialSite, SocialSite, UpdateSocialSite } from "../interfaces/social.site";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private readonly api = environment.API;

  private httpOptions = {
    withCredentials: true,
  };

  constructor(private readonly httpClient: HttpClient) {}

  getAllUsers(): Observable<[]> {
    return this.httpClient.get<[]>(
      `${this.api}/users/get/all`,
      this.httpOptions
    );
  }

  getAllDocuments(): Observable<Document[]> {
    return this.httpClient.get<Document[]>(
      `${this.api}/document/get/all`,
      this.httpOptions
    );
  }

  createDocument(document: CreateDocument): Observable<{ state: boolean; message: string }> {
    return this.httpClient.post<{ state: boolean; message: string }>(
      `${this.api}/document/create`,
      document,
      this.httpOptions
    );
  }

  updateDocument(
    id: string | undefined,
    document: UpdateDocument
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient.put<{ state: boolean; message: string }>(
      `${this.api}/document/update/${id}`,
      document,
      this.httpOptions
    );
  }

  deleteDocument(id: string): Observable<{ state: boolean; message: string }> {
    return this.httpClient.delete<{ state: boolean; message: string }>(
      `${this.api}/document/delete/${id}`,
      this.httpOptions
    );
  }

  /**
   * Metodo para activar un documento como vigente
   * @param id 
   * @returns state: estado de la peticcion y message: mensaje de la peticion
   */
  activeDocument(id: string): Observable<{ state: boolean; message: string }> {
    return this.httpClient.put<{ state: boolean; message: string }>(
      `${this.api}/document/activation/${id}`, {},
      this.httpOptions
    );
  }

  getBusinessProfile(): Observable<BusinessProfile> {
    return this.httpClient.get<BusinessProfile>(
      `${this.api}/business/info`,
      this.httpOptions
    );
  }

  updateBussinesProfile(
    id: string | undefined,
    updateBusinessProfile: Partial<UpdateBusinessProfile>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient.put<{ state: boolean; message: string }>(
      `${this.api}/business/update/profile/${id}`,
      updateBusinessProfile,
      this.httpOptions
    );
  }

  /**
   * Metodo para obtener los datos de la auditoria
   */
  getAuditData(): Observable<Audit[]> {
    return this.httpClient.get<Audit[]>(
      `${this.api}/audit/info`,
      this.httpOptions
    );
  }

  /**
   * Metodo para obtener la configuracion del modulo de incidencias
   */
  getIncidentConfiguration(): Observable<IncidentConfiguration> {
    return this.httpClient.get<IncidentConfiguration>(
      `${this.api}/incident/configuration`,
      this.httpOptions
    );
  }

  /**
   * Metodo para actualizar la configuracion del modulo incidencias
   */
  updateIncidentConfiguration(
    id: string | undefined,
    updateIncidentConfiguration: UpdateIncidentConfiguration
  ): Observable<{ state: boolean; message: string}> {
    return this.httpClient.put<{ state: boolean; message: string }>(
      `${this.api}/incident/update/configuration/${id}`,
      updateIncidentConfiguration,
      this.httpOptions
    )
  }

  /**
   * Metodo para obtener la configuracion del modulo de email
   */
  getEmailConfiguration(): Observable<EmailConfiguration> {
    return this.httpClient.get<EmailConfiguration>(
      `${this.api}/email/configuration`,
      this.httpOptions
    );
  }

  /**
   * Metodo para actualizar la configuracion del modulo de email
   */
  updateEmailConfiguration(
    id: string | undefined,
    updateEmailConfiguration: Partial<UpdateEmailConfiguration>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient.put<{ state: boolean; message: string}>(
      `${this.api}/email/update/configuration/${id}`,
      updateEmailConfiguration,
      this.httpOptions
    )
  }

  /**
   * Metodo para obtener todas las redes sociales
   */
  getSocialSites(): Observable<SocialSite[]> {
    return this.httpClient.get<SocialSite[]>(
      `${this.api}/business/get/social`,
      this.httpOptions
    );
  }

  /**
   * Metodo para añadir redes sociales
   */
  createSocialSite(
    createSocialSite: Partial<CreateSocialSite>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient.post<{ state: boolean; message: string }>(
      `${this.api}/business/create/social`,
      createSocialSite,
      this.httpOptions
    );
  }

  /**
   * Metodo para actualizar redes sociales
   */
  updateSocialSite(
    id: string | undefined,
    updateSocialSite: Partial<UpdateSocialSite>
  ): Observable<{ state: boolean, message: string}> {
    return this.httpClient.put<{ state: boolean; message: string }>(
      `${this.api}/business/update/social/${id}`,
      updateSocialSite,
      this.httpOptions
    )
  }

  /**
   * Metodo para eliminar una redes social
   */
  deleteSocialSite(
    id: string | undefined,
  ): Observable<{ state: boolean, message: string}> {
    return this.httpClient.delete<{ state: boolean; message: string}>(
      `${this.api}/business/delete/social/${id}`,
      this.httpOptions
    )
  }

}
