import { Component, OnInit, Input } from '@angular/core';
import { DataObject } from './data-object';
import * as _ from 'lodash';

@Component({
  selector: 'lib-dynamic-table',
  template: `
  <div class="table-container">
  <div class="table" ng-hide="tableC.errorTable || tableC.errorBrand"
  style="border: 1px solid black; display: flex; flex-direction: column;">
      <div class="thead" style="color: white; display: flex; flex-direction: column; font-weight: normal; text-align: center;">
          <div class="tr" style="display: flex; flex-direction: row; justify-content: center;">
              <div *ngFor="let item of tableData.thLabel; index as i" [ngStyle]="{'width': widthTableCell[i] + '%'}" class="th"
              style="align-items: center; background-color: black; border: 1px solid black; border-left: 1px solid black;
              border-right: 1px solid black; display: flex; flex-direction: row; flex-wrap: wrap; font-weight: normal !important;
              justify-content: center;">
                  <span style="margin: 0 5px; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize;">{{item}}</span>
              </div>
          </div>
      </div>
      <div class="wrap" ng-class="{'wrap-report': tableC.report}"
      style="-webkit-overflow-scrolling: touch; max-height: 53vh; overflow-y: overlay;">
          <div class="tbody" style="display: flex; flex-direction: column;">
              <div class="tr" *ngFor="let row of tableData.tdData" style="display: flex; flex-direction: row;">
                  <div *ngFor="let item of row; index as i" [ngStyle]="{'width': widthTableCell[i] + '%'}" class="td"
                  style="align-items: center; border: 1px solid black; display: flex; flex-direction: row; justify-content: center;
                  min-height: 35px; position: relative; text-align: center;">
                      <p>{{item}}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
  `,
  styles: []
})
export class DynamicTableComponent implements OnInit {
  @Input()
  tableData: DataObject;
  totalWidth: number;
  widthTableCell: Array<number>;
  minWidth: number;
  maxWidth: number;
  errorTable: boolean;
  constructor() {
    this.totalWidth = 100;
    this.minWidth = 7;
    this.maxWidth = 45;
    this.errorTable = false;
    this.widthTableCell = [];
  }

  ngOnInit() {
    if (this.tableData.tdData && this.tableData.thLabel) {
      this.manageWidthTable();
    }
  }
  manageWidthTable = function () {
    if (this.tableData.tdData.length !== 0) {
      this.addWidthTable(this.tableData.thLabel, this.tableData.tdData);

      while (_.sumBy(this.widthTableCell) > this.totalWidth) {
        _.forEach(this.widthTableCell, this.subtractWidth);
      }
      if (this.totalWidth - _.sumBy(this.widthTableCell) !== 0) {
        this.correctTotalWidth();
      }

    }
  };
  addWidthTable = function (arrayLabel, arrayData) {
    const that = this;
    this.addWidthArray(arrayLabel, true);
    _.forEach(arrayData, function (data) {
      that.addWidthArray(data, false);
    });
  };

  addWidthArray = function (array, isLabel: boolean) {
    const that = this;
    _.forEach(array, function (value, index) {
      if (value) {
        isLabel ?
          that.widthTableCell.push(value.length) :
          // tslint:disable-next-line:no-unused-expression
          that.widthTableCell[index] < value.length && (that.widthTableCell[index] = value.length);
        // tslint:disable-next-line:no-unused-expression
        that.widthTableCell[index] < that.minWidth && (that.widthTableCell[index] = that.minWidth);
        // tslint:disable-next-line:no-unused-expression
        that.widthTableCell[index] > that.maxWidth && (that.widthTableCell[index] = that.maxWidth);
      } else {
        that.errorTable = true;
      }
    });
  };

  correctTotalWidth = function () {
    const that = this;
    let difference = this.totalWidth - _.sumBy(this.widthTableCell);
    while (difference !== 0) {
      _.forEach(this.widthTableCell, correctWidth);
    }

    function correctWidth(width, index) {
      if (difference !== 0) {
        that.widthTableCell[index] = width + 1;
        difference -= 1;
      }
    }
  };
}
