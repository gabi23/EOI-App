import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export type User = {
  id?: string, 
  name: string,
  surname: string,
  email: string,
  phone: number,
  role?: string,
  safeWord?: string,
  courses: number[],
  gitHubLogin: string,
  image?,
  web?
};

export type Course = {
  id?: number, 
  name: string,
  studyField: string,
  description: string,
  image?
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage, private firebaseDB: AngularFirestore) { }

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

  public addUser(newUser: User): Promise<any>{
    const result = this.firebaseDB.collection("users").add(newUser)
                                  .then(docRef => {
                                    let id = docRef.id;
                                    this.firebaseDB.collection("users").doc(id).update({
                                      "id": id
                                    });
                                  })
                                  .catch(error => console.log(error));
    return result;    
  }

  public addCourse(newCourse: Course): Promise<any>{
    const result = this.firebaseDB.collection("courses").add(newCourse)
                                  .then(docRef => {
                                    let id = docRef.id;
                                    this.firebaseDB.collection("courses").doc(id).update({
                                      "id": id
                                    });
                                  })
                                  .catch(error => console.log(error));
    return result;    
  }

  public getAllUsers(): User[] {
    let users = [];
    this.firebaseDB.collection("users").get().toPromise().then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                          users.push(JSON.parse(JSON.stringify(doc.data())));
                      });
    });
    return users;                  
  }

  public getAllCourses(): Course[] {
    let courses = [];
    this.firebaseDB.collection("courses").get().toPromise().then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        courses.push(JSON.parse(JSON.stringify(doc.data())));
                      });
    });
    return courses;                  
  }

  public getUser(id: string): Promise<User> {
    let user = this.firebaseDB.collection("users").doc(id).get().toPromise()
                  .then((querySnapshot) => JSON.parse(JSON.stringify(querySnapshot.data()))
               );
    return user;
  }

}
