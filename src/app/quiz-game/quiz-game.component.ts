import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent implements OnInit {

  constructor() { }
  form: FormGroup
  test: any;
  bonneRep = [];
  reponseUtulisateur = []
  resF="";
  resFaute="";
  ngOnInit() {
    this.form = new FormGroup({
      quiz: new FormArray([this.addQuestion()])
    })
  }
  Add() {
    const quizz = this.form.get('quiz') as FormArray;
    quizz.push(this.addQuestion())
  }
  addQuestion(): FormGroup {
    return new FormGroup({
      question: new FormControl(""),
      RepA: new FormControl(""),
      RepB: new FormControl(""),
      RepC: new FormControl(""),
      RepD: new FormControl(""),
      correctRep: new FormControl("")
    })
  }
  delet(i) {
    const quizz = this.form.get('quiz') as FormArray;
    quizz.removeAt(i);
  }
  affichageFinale(index) {
    this.test = this.form.value.quiz;
    this.bonneRep = [];
    this.reponseUtulisateur = [];
    for (let i = 0; i < this.test.length; i++) {
      this.bonneRep.push(this.test[i].correctRep);
      this.reponseUtulisateur.push('');
      console.log(this.bonneRep)
    }
  }
  noteSur20() {
    let n=0
    let NQ=20/this.bonneRep.length;
    let falseRep=0;
    for (let i = 0; i < this.bonneRep.length; i++) {
      if (this.bonneRep[i]=== this.reponseUtulisateur[i]) {
        n=n+NQ; 
      }else{
        falseRep=falseRep+1
      }
      
    }
    console.log(falseRep);
    this.resFaute=String(falseRep);
    this.resF="votre note sur 20 est "+ String(n);

  }
  getAnswer(rep, i) {
    this.reponseUtulisateur[i] = rep;
  }
}
