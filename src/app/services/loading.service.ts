import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }
}
