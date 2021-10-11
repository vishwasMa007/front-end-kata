import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

export interface assemblyEngine {
  labels: string;
  stages: any[];
}

@Component({
  selector: 'assemblyline',
  templateUrl: './assemblyline.component.html',
  styleUrls: ['./assemblyline.component.scss'],
})
export class AssemblyLineComponent implements OnInit {
  @Input() stages: any[];
  @ViewChild('box') inputBox: ElementRef;
  emptyContent = null;
  assemblyData: any[];
  stagelabel: string;
  stageData: any[];
  assemblyDetailsToView: any[] = [];

  getArray(items: any[]): any[] {
    return new Array().concat(items);
  }

  /* Initialised Array with stagelabel for label and stageData for storing values from Input*/
  ngOnInit() {
    this.stages.forEach((data: any) => {
      this.assemblyData = new Array();
      let assemblyData = { stagelabel: data, stageData: [] };
      this.assemblyData.push(assemblyData);

      let initialArray = this.getArray(this.assemblyData);
      this.assemblyDetailsToView.push(initialArray);
    });
  }

  /* On every Entry of input Data, its added to first phase of Assembly Component and TextBox is Cleared after every entry*/
  onEnter(value) {
    this.assemblyDetailsToView.forEach((data, index) => {
      if (index === 0) {
        if (data[index].stageData.includes(value)) {
          alert('Sorry ! Duplicate Data not allowed');
        } else {
          data[index].stageData.push(value);
          console.log(data);
        }
        this.inputBox.nativeElement.value = this.emptyContent;
      }
    });
  }

  /*Triggering left click to move backward*/
  onLeftClick(value, assemblyStage) {
    console.log(value);
    this.assemblyDetailsToView.forEach((data, index) => {
      this.backWardProcess(
        data,
        index,
        assemblyStage,
        this.assemblyDetailsToView,
        value
      );
    });
  }

  /*Triggering Right click to move forward*/
  onRightClick(value, assemblyStage) {
    console.log(value);
    this.assemblyDetailsToView.forEach((data, index) => {
      this.forWardProcess(
        data,
        index,
        assemblyStage,
        this.assemblyDetailsToView,
        value
      );
    });
  }

  /* moving assembly Items in forward direction towards Deployment and removing if exceeds Deployment phase*/
  forWardProcess(data, index, assemblyStage, assemblyDetailsToView, value) {
    data.forEach((data) => {
      if (assemblyStage == 'Idea') {
        assemblyDetailsToView[index + 1][index].stageData.push(value);
        this.forwardItemRemove(assemblyDetailsToView, index, 0, value);
      } else if (assemblyStage == 'Development') {
        assemblyDetailsToView[index + 2][index].stageData.push(value);
        this.forwardItemRemove(assemblyDetailsToView, index, 1, value);
      } else if (assemblyStage == 'Testing') {
        assemblyDetailsToView[index + 3][index].stageData.push(value);
        this.forwardItemRemove(assemblyDetailsToView, index, 2, value);
      } else if (assemblyStage == 'Deployment') {
        this.forwardItemRemove(assemblyDetailsToView, index, 3, value);
      }
    });
  }

  /* Remove Process activated for forward approach*/

  forwardItemRemove(assemblyDetailsToView, index, incrementIndex, value) {
    const indexd =
      assemblyDetailsToView[index + incrementIndex][index].stageData.indexOf(
        value
      );
    if (indexd > -1) {
      assemblyDetailsToView[index + incrementIndex][index].stageData.splice(
        indexd,
        1
      );
    }
  }
  /* moving assembly Items in backward direction towards Idea and removing if exceeds Idea phase*/
  backWardProcess(data, index, assemblyStage, assemblyDetailsToView, value) {
    data.forEach((data) => {
      if (assemblyStage == 'Idea') {
        this.backwardItemRemove(assemblyDetailsToView, index, 4, value);
      } else if (assemblyStage == 'Development') {
        assemblyDetailsToView[assemblyDetailsToView.length - 4][
          index
        ].stageData.push(value);
        this.backwardItemRemove(assemblyDetailsToView, index, 3, value);
      } else if (assemblyStage == 'Testing') {
        assemblyDetailsToView[assemblyDetailsToView.length - 3][
          index
        ].stageData.push(value);
        this.backwardItemRemove(assemblyDetailsToView, index, 2, value);
      } else if (assemblyStage == 'Deployment') {
        assemblyDetailsToView[assemblyDetailsToView.length - 2][
          index
        ].stageData.push(value);
        this.backwardItemRemove(assemblyDetailsToView, index, 1, value);
      }
    });
  }
  /* Remove Process activated for backward approach*/
  backwardItemRemove(assemblyDetailsToView, index, decrementalIndex, value) {
    const indexd =
      assemblyDetailsToView[assemblyDetailsToView.length - decrementalIndex][
        index
      ].stageData.indexOf(value);
    if (indexd > -1) {
      assemblyDetailsToView[assemblyDetailsToView.length - decrementalIndex][
        index
      ].stageData.splice(indexd, 1);
    }
  }
}
