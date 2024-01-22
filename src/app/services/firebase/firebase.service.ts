import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  downloadURL$!: Observable<string>;
  constructor(private storage: Storage) {}

  async uploadProfileFile(file: File, userName: string): Promise<string> {
    const filepath = `user/${userName}/${file.name}`;
    const fileref = ref(this.storage, filepath);

    return new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(fileref, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress: ', progress);
        },
        (error) => {
          console.log('Error uploading file: ', error);
          reject('Error uploading file');
        },
        async () => {
          console.log('File uploaded successfully');
          try {
            const url = await getDownloadURL(fileref);
            console.log('Download URL: ', url);
            resolve(url);
          } catch (error) {
            console.log('Error retrieving download URL: ', error);
            reject('Error retrieving download URL');
          }
        }
      );
    });
  }

  async uploadPosterPelicula(file: File, movieName: string): Promise<string> {
    const filepath = `movies/${movieName}/${file.name}`;
    const fileref = ref(this.storage, filepath);

    return new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(fileref, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress: ', progress);
        },
        (error) => {
          console.log('Error uploading file: ', error);
          reject('Error uploading file');
        },
        async () => {
          console.log('File uploaded successfully');
          try {
            const url = await getDownloadURL(fileref);
            console.log('Download URL: ', url);
            resolve(url);
          } catch (error) {
            console.log('Error retrieving download URL: ', error);
            reject('Error retrieving download URL');
          }
        }
      );
    });
  }
}
