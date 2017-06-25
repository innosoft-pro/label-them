/**
 * Created by alnedorezov on 6/25/17.
 */

var HistoryRecordTypeEnum = Object.freeze({ADD_OBJECT: 1, DELETE_OBJECT: 2, MODIFY_OBJECTS_CLASS: 3,
    MODIFY_BOOLEAN_PARAMETERS_VALUE: 4, MODIFY_STRING_PARAMETERS_VALUE: 5, MODIFY_SELECT_PARAMETERS_VALUE: 6});

var historyRecords = [];
var redoHistoryPoints = [];

class HistoryRecord {
    constructor(recordType) {
        this.recordType = recordType;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class HistoryRecordPolygon extends HistoryRecord {
    constructor(recordType, polygon) {
        super(recordType);
        this.polygon = polygon;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class HistoryRecordClass extends HistoryRecord {
    constructor(recordType, polygonId, classValue) {
        super(recordType);
        this.polygonId = polygonId;
        this.classValue = classValue;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class HistoryRecordParameter extends HistoryRecord {
    constructor(recordType, polygonId, parameterName, parameterValue) {
        super(recordType);
        this.polygonId = polygonId;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
    }

    toString() {
        return JSON.stringify(this);
    }
}

function addHistoryRecord(recordType) {
    historyRecords.push(new HistoryRecord(recordType));
    redoHistoryPoints = [];
}

function addHistoryRecordPolygon(recordType, polygon) {
    historyRecords.push(new HistoryRecordPolygon(recordType, polygon));
    redoHistoryPoints = [];
}

function addHistoryRecordClass(recordType, polygonId, classValue) {
    historyRecords.push(new HistoryRecordClass(recordType, polygonId, classValue));
    redoHistoryPoints = [];
}

function addHistoryRecordParameter(recordType, polygonId, parameterName, parameterValue) {
    historyRecords.push(new HistoryRecordParameter(recordType, polygonId, parameterName, parameterValue));
    redoHistoryPoints = [];
}

function undoHistoryRecordsAddition() {
    if(historyRecords.length<=0) {
        return;
    }

    let historyRecord = historyRecords.pop();
    redoHistoryPoints.push(historyRecord);

    switch(historyRecord.recordType) {
        case HistoryRecordTypeEnum.ADD_OBJECT:
            undoObjectsAddition(historyRecord);
            break;
        case HistoryRecordTypeEnum.DELETE_OBJECT:
            break;
        case HistoryRecordTypeEnum.MODIFY_OBJECTS_CLASS:
            break;
        case HistoryRecordTypeEnum.MODIFY_BOOLEAN_PARAMETERS_VALUE:
            break;
        case HistoryRecordTypeEnum.MODIFY_STRING_PARAMETERS_VALUE:
            break;
        case HistoryRecordTypeEnum.MODIFY_SELECT_PARAMETERS_VALUE:
            break;
        default:
            break;
    }
}

function undoObjectsAddition(polygon) {
    if (polygon.polygonId in polygons) {
        delete polygons[polygon.polygonId];
        onPolygonDeleted(polygon, true);

        svgImg.removeChild(polygon.node);
    }
}