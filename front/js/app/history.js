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
    constructor(recordType, polygon, parameters = null) {
        super(recordType);
        this.polygon = polygon;
        this.parameters = parameters;
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
    enableOrDisableAnElementById("delete-row");
    if (!isRedo) {
        resetRedoHistoryPointsData();
    }
}

function addHistoryRecordPolygon(recordType, polygon, parameters = null, isRedo = false) {
    historyRecords.push(new HistoryRecordPolygon(recordType, polygon, parameters));
    let textToHistoryRow;
    if (recordType === HistoryRecordTypeEnum.ADD_OBJECT) {
        textToHistoryRow = activeLanguage.polygonWasAddedAndAssignedAnId + polygon.polygonId;
    } else if (recordType === HistoryRecordTypeEnum.DELETE_OBJECT) {
        textToHistoryRow = activeLanguage.polygonWithIdSpaceSign + polygon.polygonId +
            activeLanguage.closeBracketSpaceSignWasDeleted;
    }
    addHistoryRow(textToHistoryRow);
    enableOrDisableAnElementById("delete-row");
    if (!isRedo) {
        resetRedoHistoryPointsData();
    }
}

function addHistoryRecordClass(recordType, polygonId, newClassValue, previousClassValue, isRedo = false) {
    historyRecords.push(new HistoryRecordClass(recordType, polygonId, newClassValue, previousClassValue));
    let textToHistoryRow = activeLanguage.classOfPolygonIdWasChangedToNewClassValue(polygonId, newClassValue);
    addHistoryRow(textToHistoryRow);
    enableOrDisableAnElementById("delete-row");
    if (!isRedo) {
        resetRedoHistoryPointsData();
    }
}

function addHistoryRecordParameter(recordType, polygonId, parameterName, newParameterValue, previousParameterValue,
                                   isRedo = false) {
    historyRecords.push(new HistoryRecordParameter(recordType, polygonId, parameterName, newParameterValue,
        previousParameterValue));
    let textToHistoryRow = activeLanguage.parameterParameterNameOfPolygonPolygonIdWasChangedToNewParameterValue(
        parameterName, polygonId, newParameterValue);
    addHistoryRow(textToHistoryRow);
    enableOrDisableAnElementById("delete-row");
    if (!isRedo) {
        resetRedoHistoryPointsData();
    }
}

function undoHistoryRecordsAddition() {
    if (historyRecords.length <= 0) {
        return;
    }

    let historyRecord = historyRecords.pop();
    redoHistoryPoints.push(historyRecord);

    if (historyRecord.recordType === HistoryRecordTypeEnum.ADD_OBJECT) {
        undoObjectsAddition(historyRecord.polygon);
    } else if (historyRecord.recordType === HistoryRecordTypeEnum.DELETE_OBJECT) {
        undoObjectsDeletion(historyRecord.polygon, historyRecord.parameters);
    } else if (historyRecord.recordType === HistoryRecordTypeEnum.MODIFY_OBJECTS_CLASS) {
        undoModificationOfTheObjectsClass(historyRecord.polygonId, historyRecord.previousClassValue);
    } else {
        undoModificationOfTheObjectsParameter(historyRecord.recordType, historyRecord.polygonId,
            historyRecord.parameterName, historyRecord.previousParameterValue);
    }

    deleteHistoryRow();
    enableOrDisableAnElementById("add-row");

    if (historyRecords.length <= 0) {
        enableOrDisableAnElementById("delete-row", false);
    }
}

function redoHistoryRecordsAddition() {
    if (redoHistoryPoints.length <= 0) {
        return;
    }

    let historyRecord = redoHistoryPoints.pop();

    if (historyRecord.recordType === HistoryRecordTypeEnum.ADD_OBJECT) {
        redoObjectsAddition(historyRecord.polygon);
        addHistoryRecordPolygon(historyRecord.recordType, historyRecord.polygon, null, true);
    } else if (historyRecord.recordType === HistoryRecordTypeEnum.DELETE_OBJECT) {
        redoObjectsDeletion(historyRecord.polygon);
        addHistoryRecordPolygon(historyRecord.recordType, historyRecord.polygon, historyRecord.parameters, true);
    } else if (historyRecord.recordType === HistoryRecordTypeEnum.MODIFY_OBJECTS_CLASS) {
        redoModificationOfTheObjectsClass(historyRecord.polygonId, historyRecord.newClassValue);
        addHistoryRecordClass(historyRecord.recordType, historyRecord.polygonId, historyRecord.newClassValue,
            historyRecord.previousClassValue, true);
    } else {
        redoModificationOfTheObjectsParameter(historyRecord.recordType, historyRecord.polygonId,
            historyRecord.parameterName, historyRecord.newParameterValue);
        addHistoryRecordParameter(historyRecord.recordType, historyRecord.polygonId, historyRecord.parameterName,
            historyRecord.newParameterValue, historyRecord.previousParameterValue, true);
    }

    if (redoHistoryPoints.length <= 0) {
        enableOrDisableAnElementById("add-row", false);
    }
}

function undoObjectsAddition(polygon) {
    if (polygon.polygonId in polygons) {
        delete polygons[polygon.polygonId];
        onPolygonDeleted(polygon, true);

        svgImg.removeChild(polygon.node);

        if (selectedPolygon !== null && selectedPolygon.polygonId === polygon.polygonId) {
            selectedPolygon = null;
        }
    }
}

function redoObjectsAddition(polygon) {
    polygon.scale((1 / polygon.polygonScale) * currentScale);
    polygons[polygon.polygonId] = polygon;
    onPolygonClosed(polygon, true);
    onPolygonClick(polygon);
}

function undoObjectsDeletion(polygon, parameters) {
    redoObjectsAddition(polygon);
    // polygon with id=polygon.polygonId is now selected
    dc.getActiveEntity().setParams(parameters);
    setClassesAndParametersValues(dc.getActiveEntity());
}

function redoObjectsDeletion(polygon) {
    undoObjectsAddition(polygon);
}

function undoModificationOfTheObjectsClass(polygonId, classValue) { // class value = previous class value
    let currentActiveEntityId = null;
    if (dc.getActiveEntity() !== null) {
        currentActiveEntityId = dc.getActiveEntity().polygonId;
    }
    dc.selectEntity(polygonId);
    onObjectClassUpdate(classValue, true);
    dc.selectEntity(currentActiveEntityId);
    if (currentActiveEntityId !== null && currentActiveEntityId === polygonId) {
        setClassesAndParametersValues(dc.getActiveEntity());
    }
}

function redoModificationOfTheObjectsClass(polygonId, classValue) { // class value = new class value
    undoModificationOfTheObjectsClass(polygonId, classValue);
}

function undoModificationOfTheObjectsParameter(recordType, polygonId, parameterName, parameterValue) { // parameter value = previous parameter value
    let currentActiveEntityId = null;
    if (dc.getActiveEntity() !== null) {
        currentActiveEntityId = dc.getActiveEntity().polygonId;
    }
    dc.selectEntity(polygonId);
    switch (recordType) {
        case HistoryRecordTypeEnum.MODIFY_BOOLEAN_PARAMETERS_VALUE:
            onBoolParamUpdate(parameterName, parameterValue, true);
            break;
        case HistoryRecordTypeEnum.MODIFY_STRING_PARAMETERS_VALUE:
            onStringParamUpdate(parameterName, parameterValue, true);
            break;
        case HistoryRecordTypeEnum.MODIFY_SELECT_PARAMETERS_VALUE:
            onSelectParamUpdate(parameterName, parameterValue, true);
            break;
        default:
            break;
    }
    dc.selectEntity(currentActiveEntityId);
    if (currentActiveEntityId !== null && currentActiveEntityId === polygonId) {
        setClassesAndParametersValues(dc.getActiveEntity());
    }
}

function redoModificationOfTheObjectsParameter(recordType, polygonId, parameterName, parameterValue) { // parameter value = new parameter value
    undoModificationOfTheObjectsParameter(recordType, polygonId, parameterName, parameterValue);
}

function resetRedoHistoryPointsData() {
    redoHistoryPoints = [];
    enableOrDisableAnElementById("add-row", false);
}

function generateHistoryBlockContents() {
    for (let historyRecord of historyRecords) {
        let textToHistoryRow;
        if (historyRecord.recordType === HistoryRecordTypeEnum.ADD_OBJECT) {
            textToHistoryRow = activeLanguage.polygonWasAddedAndAssignedAnId + historyRecord.polygon.polygonId;
        } else if (historyRecord.recordType === HistoryRecordTypeEnum.DELETE_OBJECT) {
            textToHistoryRow = activeLanguage.polygonWithIdSpaceSign + historyRecord.polygon.polygonId +
                activeLanguage.closeBracketSpaceSignWasDeleted;
        } else if (historyRecord.recordType === HistoryRecordTypeEnum.MODIFY_OBJECTS_CLASS) {
            textToHistoryRow = activeLanguage.classOfPolygonIdWasChangedToNewClassValue(historyRecord.polygonId,
                historyRecord.newClassValue);
        } else {
            textToHistoryRow = activeLanguage.parameterParameterNameOfPolygonPolygonIdWasChangedToNewParameterValue(
                historyRecord.parameterName, historyRecord.polygonId, historyRecord.newParameterValue);
        }
        addHistoryRow(textToHistoryRow);
    }
}

function recreateHistoryBlockContents() {
    clearHistoryTable();
    generateHistoryBlockContents();
}

function modifyPointsOfPolygonInHistoryRecords(polygon) {
    let recordWasModified = false;
    for(let i=historyRecords.length-1; i>0; i--) {
        if(recordWasModified) {
            break;
        }
        if(historyRecords[i].recordType === HistoryRecordTypeEnum.ADD_OBJECT &&
            historyRecords[i].polygon.polygonId === polygon.polygonId) {
                historyRecords[i].polygon = polygon;
                recordWasModified = true;
        }
    }
}
