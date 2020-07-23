import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { isUndefined } from 'util';

export type User = {
  id?: string, 
  name: string,
  surname: string,
  email: string,
  phone: number,
  role?: string,
  safeWord?: string,
  courses: string[],
  gitHubLogin: string,
  image?,
  web?
};

export type Course = {
  id?: string, 
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

  async getPublicURL(fileName: string){
    const ref = this.storage.ref(fileName);
    const publicURL = ref.getDownloadURL().toPromise()
                           .then(URL => URL)
                           .catch(error => console.log(error));
    return publicURL;
  }

  async addUser(newUser: User): Promise<any>{
    const result = this.firebaseDB.collection("users").add(newUser)
                                  .then(docRef => {
                                    let id = docRef.id;
                                    this.firebaseDB.collection("users").doc(id).update({
                                      "id": id,
                                    });
                                  })
                                  .catch(error => console.log(error));
    return result;    
  }

  async addCourse(newCourse: Course): Promise<any>{
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

  async getAllUsers(): Promise<User[]> {
    let users: User[] = [];
    await this.firebaseDB.collection("users").get().toPromise().then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                          users.push(JSON.parse(JSON.stringify(doc.data())));
                      });
    });
    return users;                  
  }

  async getAllCourses(): Promise<Course[]> {
    let courses: Course[] = [];
    await this.firebaseDB.collection("courses").get().toPromise().then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        courses.push(JSON.parse(JSON.stringify(doc.data())));
                      });
    });
    return courses;     
  }

  async getUser(id: string): Promise<User> {
    const user = await this.firebaseDB.collection("users").doc(id).get().toPromise()
                  .then((querySnapshot) => JSON.parse(JSON.stringify(querySnapshot.data()))
               );
    return user;
  }

  public getUserByName(name:string): User[]{
    let user = [];
    this.firebaseDB.collection("users", ref => ref.where('name', '>=', name).where('name', '<=', name + '~')).get().toPromise()
                   .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        user.push(JSON.parse(JSON.stringify(doc.data())));
                      });
                   });
    this.firebaseDB.collection("users", ref => ref.where('surname', '>=', name).where('surname', '<=', name + '~')).get().toPromise()
                   .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        user.push(JSON.parse(JSON.stringify(doc.data())));
                      });
                   });
    return user;
  }

  async getCourseByName(name:string): Promise<Course[]>{
    let course: Course[] = [];
    await this.firebaseDB.collection("courses", ref => ref.where('name', '==', name)).get().toPromise()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          course.push(JSON.parse(JSON.stringify(doc.data())));
                        });
                      });
    return course;
  }

  async getUsersByCourse(course:Course): Promise<User[]>{
    let users: User[] = [];
    await this.firebaseDB.collection("users", ref => ref.where('courses', 'array-contains', course.id)).get().toPromise()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          users.push(JSON.parse(JSON.stringify(doc.data())));
                        });
                      });
    return users; 
  }

  async getUserCourses(ids:string[]): Promise<Course[]>{
    let courses: Course[] = [];
    for(let i=0; i<ids.length; i++){
      await this.firebaseDB.collection("courses", ref => ref.where('id', '==', ids[i])).get().toPromise()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            courses.push(JSON.parse(JSON.stringify(doc.data())));
        });
      });
    }
    return courses;
  }

  async findEmail(email:string): Promise<User[]>{
    let users: User[] = [];
    await this.firebaseDB.collection("users", ref => ref.where('email', '==', email)).get().toPromise()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          users.push(JSON.parse(JSON.stringify(doc.data())));
                        });
                      });
    return users;
  }

  public updateUser(id:string, updatedUser:User) {
    console.log(updatedUser)
    if(updatedUser.name != undefined){
      this.firebaseDB.collection("users").doc(id).update({
        "name": updatedUser.name});
    }
    if(updatedUser.surname != undefined){
      this.firebaseDB.collection("users").doc(id).update({
        "surname": updatedUser.surname});
    }
    if(updatedUser.email != undefined){
      this.firebaseDB.collection("users").doc(id).update({
        "email": updatedUser.email});
    }
    if(updatedUser.phone != undefined){
      this.firebaseDB.collection("users").doc(id).update({
        "phone": updatedUser.phone});
    }
    
    this.firebaseDB.collection("users").doc(id).update({
      "courses": updatedUser.courses});
    
    if(updatedUser.gitHubLogin != undefined){
      this.firebaseDB.collection("users").doc(id).update({
        "gitHubLogin": updatedUser.gitHubLogin});
    }
    
   this.firebaseDB.collection("users").doc(id).update({
    "image": updatedUser.image});
    
    /* if(updatedUser.web != undefined){
      this.firebaseDB.collection("users").doc(id).update({
        "web": updatedUser.web});
    } */
  }

  public deleteUser(id:string) {
    this.firebaseDB.collection("users").doc(id).delete();
  }

}
