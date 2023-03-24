import * as hydrocelectomyOperations from "./hydrocelectomyOperations.validations"
import * as hydrocelectomyOperationsReports from "./hydrocelectomyOperationsReports.validations"
import * as mmdpKitsReports from "./mmdpKitsReports.validations"
import * as FSUZoneReports from "./FSUZoneReports.validations"
import * as FCUMisMtrReports from "./FCUMisMtrReports.validations"
import * as NCMisMtrReports from "./NCMisMtrReports.validations"
import * as RCOMisMtrReports from "./RCOMisMtrReports.validations"
import * as YearwiseMisMtrReports from "./YearwiseMisMtrReports.validations"

export const bodySchema = {
  "/hydrocelectomyOperations/create": hydrocelectomyOperations.createValidation,
  "/hydrocelectomyOperations/bulkCreate": hydrocelectomyOperations.bulkCreateValidation,
  "/hydrocelectomyOperations/update": hydrocelectomyOperations.updateValidation,
  "/hydrocelectomyOperationsReport/getHydroceleOperationsReport": hydrocelectomyOperationsReports.postValidation,
  "/mmdpKitsReport/getMMDPKitsReport": mmdpKitsReports.postValidation,
  "/fsuZoneReport/getFSUZoneReport": FSUZoneReports.postValidation,
  "/fcuMisMtrReport/getFCUMisMtrReport": FCUMisMtrReports.postValidation,
  "/ncMisMtrReport/getNCMisMtrReport": NCMisMtrReports.postValidation,
  "/rcoMisMtrReport/getRCOMisMtrReport": RCOMisMtrReports.postValidation,
  "/yearwiseMisMtrReport/getYearwiseMisMtrReport": YearwiseMisMtrReports.postValidation,
}

export const querySchema = {
  "/hydrocelectomyOperations/getone": hydrocelectomyOperations.getOneValidation,
  "/hydrocelectomyOperations/delete": hydrocelectomyOperations.deleteValidation
}