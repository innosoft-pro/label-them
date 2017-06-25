/**
 * Created by alnedorezov on 6/25/17.
 */

var HistoryRecordTypeEnum = Object.freeze({
    ADD_OBJECT: 1, DELETE_OBJECT: 2, MODIFY_OBJECTS_CLASS: 3,
    MODIFY_BOOLEAN_PARAMETERS_VALUE: 4, MODIFY_STRING_PARAMETERS_VALUE: 5, MODIFY_SELECT_PARAMETERS_VALUE: 6
});

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
    constructor(recordType, polygonId, newClassValue, previousClassValue) {
        super(recordType);
        this.polygonId = polygonId;
        this.newClassValue = newClassValue;
        this.previousClassValue = previousClassValue;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class HistoryRecordParameter extends HistoryRecord {
    constructor(recordType, polygonId, parameterName, newParameterValue, previousParameterValue) {
        super(recordType);
        this.polygonId = polygonId;
        this.parameterName = parameterName;
        this.newParameterValue = newParameterValue;
        this.previousParameterValue = previousParameterValue;
    }

    toString() {
        return JSON.stringify(this);
    }
}

function addHistoryRecord(recordType, isRedo = false) {
    historyRecords.push(new HistoryRecord(recordType));
    if (!isRedo) {
        redoHistoryPoints = [];
    }
}

function addHistoryRecordPolygon(recordType, polygon, isRedo = false) {
    historyRecords.push(new HistoryRecordPolygon(recordType, polygon));
    let textToHistoryRow = "Polygon " + JSON.stringify(polygon.pointsList) + " was ";
    if (recordType === HistoryRecordTypeEnum.ADD_OBJECT) {
        textToHistoryRow += "added"
    } else if (recordType === HistoryRecordTypeEnum.DELETE_OBJECT) {
        textToHistoryRow += "deleted"
    }
    addHistoryRow(textToHistoryRow);
    if (!isRedo) {
        redoHistoryPoints = [];
    }
}

function addHistoryRecordClass(recordType, polygonId, classValue, isRedo = false) {
    historyRecords.push(new HistoryRecordClass(recordType, polygonId, classValue));
    if (!isRedo) {
        redoHistoryPoints = [];
    }
}

function addHistoryRecordParameter(recordType, polygonId, parameterName, parameterValue, isRedo = false) {
    historyRecords.push(new HistoryRecordParameter(recordType, polygonId, parameterName, parameterValue));
    if (!isRedo) {
        redoHistoryPoints = [];
    }
}

function undoHistoryRecordsAddition() {
    if (historyRecords.length <= 0) {
        return;
    }

    let historyRecord = historyRecords.pop();
    redoHistoryPoints.push(historyRecord);

    switch (historyRecord.recordType) {
        case HistoryRecordTypeEnum.ADD_OBJECT:
            undoObjectsAddition(historyRecord.polygon);
            break;
        case HistoryRecordTypeEnum.DELETE_OBJECT:
            undoObjectsDeletion(historyRecord.polygon);
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

    deleteHistoryRow();
}

function redoHistoryRecordsAddition() {
    if (redoHistoryPoints.length <= 0) {
        return;
    }

    let historyRecord = redoHistoryPoints.pop();

    switch (historyRecord.recordType) {
        case HistoryRecordTypeEnum.ADD_OBJECT:
            redoObjectsAddition(historyRecord.polygon);
            addHistoryRecordPolygon(historyRecord.recordType, historyRecord.polygon, true);
            break;
        case HistoryRecordTypeEnum.DELETE_OBJECT:
            redoObjectsDeletion(historyRecord.polygon);
            addHistoryRecordPolygon(historyRecord.recordType, historyRecord.polygon, true);
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

function redoObjectsAddition(polygon) {
    polygons[polygon.polygonId] = polygon;
    svgImg.append(polygon.node);
    polygons[polygon.polygonId].scale((1 / polygon.polygonScale) * currentScale);
    onPolygonClosed(polygon, true);
}

function undoObjectsDeletion(polygon) {
    redoObjectsAddition(polygon);
}

function redoObjectsDeletion(polygon) {
    undoObjectsAddition(polygon)
}