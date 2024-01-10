import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
  })
  export class PromotionService{

    db = firebase.firestore(); 
    promotion: AngularFirestoreCollection<any>;
    promotionCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore){
   

     this.promotion = this.afs.collection('customer');}
    
    getPromotionsList(accountId: string) {
        const promotionsCollection = this.afs.collection('customers').doc(accountId).collection('promotions', ref => ref.orderBy('date_created', 'asc'));
        return promotionsCollection.snapshotChanges();
      }

    savePromotion(promotion: any, customerID:string) {
      const docId = this.afs.createId();
      const newProductRef = this.db.collection('customers').doc(customerID).collection('promotions').doc(docId);
      const batch = this.db.batch();
      batch.set(newProductRef, promotion);
      return batch.commit();
    }

    deactivePromotion(accountId: string,customerID:string ){
      const promRef = this.afs.collection('customer').doc(customerID).collection('promotions').doc(accountId);
      promRef.update({
        active: false       
      });
    
    }
    
    deletePromotion(accountId: string){
     /*  this.user = this.usersCollection.doc(uid);
      this.user.delete()
        .then(() => this.sendMessage('success', 'La cuenta ha sido eliminada.'))
        .catch(err => this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`)); */
    }

    editPromotion(promotion: any){
      
    }
  }