import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  public upload(fileName: string, data: any) {
    return this.storage.upload(fileName, data);
  }

  public getPublicURL(fileName: string){
    const ref = this.storage.ref(fileName);
    const publicURL = ref.getDownloadURL().toPromise()
                           .then(URL => URL)
                           .catch(error => console.log(error));
    return publicURL;
  }
}
