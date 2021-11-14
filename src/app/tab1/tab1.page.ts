import { Component, OnInit } from '@angular/core';
import { RadioService } from '../services/radio.service';
import {Howl, Howler} from 'howler';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  sound: any;
  playing: boolean = false;

  nowPlayingRes: any;

  playedHistory: any;

  currentSong: any;

  constructor(
    private radioSer: RadioService,
    private loadingSer: LoadingService
  ){ }


  ngOnInit() {
    setTimeout(() => {
      this.nowPlaying();
      this.currentTime()
    }, 1000);

    // setInterval(() => {
    //   this.nowPlaying();
    // }, 10000);
  }


  playRadio() {
    this.sound = new Howl({
      src: [this.nowPlayingRes.station.listen_url],
      html5:true,
      onplay:(e)=>{
        console.log('play',e)
        this.loadingSer.dismissLoading()
      },
      onloaderror :(e)=>{
        console.log('error',e)
        this.loadingSer.dismissLoading()
      }
    });
    this.sound.play();
    this.loadingSer.presentLoading();
    this.playing = true;

    
  }

  stopRadio() {
    this.sound.stop();
    this.playing = false;
  }




  // radio now playing
  nowPlaying() {
    this.radioSer.getNowPlaying().subscribe(data => {

      this.nowPlayingRes = data[0];
      this.playedHistory = this.nowPlayingRes.song_history
      this.currentSong = this.nowPlayingRes.now_playing
      // console.log(this.nowPlayingRes)
    }, err => {
      console.log(err);
    });
  }

  // convert into time

  convertTime(time) {
    let min: any = Math.floor(time / 60);
    let sec: any = time % 60;
    min <= 9 ? min = '0' + min : min = min;
    sec <= 9 ? sec = '0' + sec : sec = sec;
    return min + ":" + sec;
  }


  getSongDuration(duration) {
    var date = new Date(duration * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }


  // IST time
  currentTime() {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()

    console.log(hoursIST + ":" + minutesIST)
  }


}
