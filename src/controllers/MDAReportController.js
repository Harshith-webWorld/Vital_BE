import {
    validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import MDAReportDao from "../dao/MDAReportDao";


const { postMDAEvalList } = db;
const Op = db.Sequelize.Op;

const MDAReportController = () => {



    const get_MDATrainingStatus1 = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var obj = {}

            var StateLvlDao = await MDAReportDao.StateLvlDao(req)

            if (StateLvlDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    message: "Something Went Wrong"
                });
            } else {

                obj.StateLvl = StateLvlDao.data
                var CHCLvlDao = await MDAReportDao.CHCLvlDao(req)

                if (CHCLvlDao.error) {
                    return res.status(httpStatus.BAD_REQUEST).json({
                        status: httpStatus.BAD_REQUEST,
                        message: "Something Went Wrong"
                    });
                } else {
                    obj.CHCLvl = CHCLvlDao.data
                    var subCenterLvlDao = await MDAReportDao.subCenterLvlDao(req)

                    if (subCenterLvlDao.error) {
                        return res.status(httpStatus.BAD_REQUEST).json({
                            status: httpStatus.BAD_REQUEST,
                            message: "Something Went Wrong"
                        });
                    } else {
                        obj.subCenterLvl = subCenterLvlDao.data

                        return res.status(httpStatus.OK).json({
                            status: httpStatus.OK,
                            data: obj,
                            message: label.LABEL_SUCCESS,
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    const coverageReport1 = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }


            var coverageReport1Dao = await MDAReportDao.coverageReport1Dao(req)
            // console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

            if (coverageReport1Dao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: coverageReport1Dao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const infrastructure = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var infrastructureDao = await MDAReportDao.infrastructureDao(req)

            if (infrastructureDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: infrastructureDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: infrastructureDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const analysis1_postMDAEvaluation = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var analysis1_postMDAEvaluation = await MDAReportDao.analysis1_postMDAEvaluationDao(reqObj)

            if (analysis1_postMDAEvaluation.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: analysis1_postMDAEvaluation.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: analysis1_postMDAEvaluation.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }



    const analysis2_postMDAEvaluation = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var analysis2_postMDAEvaluation = await MDAReportDao.analysis2_postMDAEvaluationDao(reqObj)

            if (analysis2_postMDAEvaluation.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: analysis2_postMDAEvaluation.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: analysis2_postMDAEvaluation.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const get_Co_ordinationCommitteReport = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var Co_ordinationCommitteReportDao = await MDAReportDao.Co_ordinationCommitteReportDao(req)
            console.log(Co_ordinationCommitteReportDao, 'MMMM')
            if (Co_ordinationCommitteReportDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: Co_ordinationCommitteReportDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: Co_ordinationCommitteReportDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const DrugRequirementMDA1 = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var obj = {}
            var DEC100MgDao = await MDAReportDao.DEC100MgDao(req)

            if (DEC100MgDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: DEC100MgDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                obj.DEC100Mg = DEC100MgDao.data


                var AlbendazoleDao = await MDAReportDao.AlbendazoleDao(req)

                if (AlbendazoleDao.error) {
                    return res.status(httpStatus.BAD_REQUEST).json({
                        status: httpStatus.BAD_REQUEST,
                        error: AlbendazoleDao.error,
                        message: "Something Went Wrong"
                    });
                } else {
                    obj.Albendazole = AlbendazoleDao.data
                    var MactizinDao = await MDAReportDao.MactizinDao(req)

                    if (MactizinDao.error) {
                        return res.status(httpStatus.BAD_REQUEST).json({
                            status: httpStatus.BAD_REQUEST,
                            error: MactizinDao.error,
                            message: "Something Went Wrong"
                        });
                    } else {
                        obj.Mactizin = MactizinDao.data


                        return res.status(httpStatus.OK).json({
                            status: httpStatus.OK,
                            data: obj,
                            message: label.LABEL_SUCCESS,
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const DrugRequirementMDA2 = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var obj = {}
            var DrugRequirementMDA2StateDao = await MDAReportDao.DrugRequirementMDA2StateDao(req)

            if (DrugRequirementMDA2StateDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: DrugRequirementMDA2StateDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                obj.state = DrugRequirementMDA2StateDao.data


                var DrugRequirementMDA2RdDao = await MDAReportDao.DrugRequirementMDA2RdDao(req)

                if (DrugRequirementMDA2RdDao.error) {
                    return res.status(httpStatus.BAD_REQUEST).json({
                        status: httpStatus.BAD_REQUEST,
                        error: DrugRequirementMDA2RdDao.error,
                        message: "Something Went Wrong"
                    });
                } else {
                    obj.RD = DrugRequirementMDA2RdDao.data


                    return res.status(httpStatus.OK).json({
                        status: httpStatus.OK,
                        data: obj,
                        message: label.LABEL_SUCCESS,
                    });

                }
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const DrugStockAtPHC = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var DrugStockAtPHCDao = await MDAReportDao.DrugStockAtPHCDao(req)

            if (DrugStockAtPHCDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: DrugStockAtPHCDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: DrugStockAtPHCDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }


    const DrugAdminSupervisorAvailability = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var DrugAdminSupervisorAvailabilityDao = await MDAReportDao.DrugAdminSupervisorAvailabilityDao(req)

            if (DrugAdminSupervisorAvailabilityDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: DrugStockAtPHCDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: DrugAdminSupervisorAvailabilityDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    const PhcHrAndTrainingStatus = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var PhcHrAndTrainingStatusDao = await MDAReportDao.PhcHrAndTrainingStatusDao(req)

            if (PhcHrAndTrainingStatusDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: DrugStockAtPHCDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: PhcHrAndTrainingStatusDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    const PHCwiseDrugConsumption = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var PHCwiseDrugConsumptionDao = await MDAReportDao.PHCwiseDrugConsumptionDao(req)

            if (PHCwiseDrugConsumptionDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: PHCwiseDrugConsumptionDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: PHCwiseDrugConsumptionDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }



    const BifurcationOfRegularAndMopup = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var BifurcationOfRegularAndMopupDao = await MDAReportDao.BifurcationOfRegularAndMopupDao(req)

            if (BifurcationOfRegularAndMopupDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: BifurcationOfRegularAndMopupDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: BifurcationOfRegularAndMopupDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    const ExpenditureBalanceReceivedFunds = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var ExpenditureBalanceReceivedFundsDao = await MDAReportDao.ExpenditureBalanceReceivedFundsDao(req)

            if (ExpenditureBalanceReceivedFundsDao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: ExpenditureBalanceReceivedFundsDao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: ExpenditureBalanceReceivedFundsDao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    const postMDAEvalListDropdown = async (req, res) => {
        try {

            db.sequelize.query(`SELECT * FROM public."postMDAEvalLists" where "isActive"=true and "nameOfInvestigator" IS NOT NULL ORDER BY id ASC `).then(([results, metadata]) => {
                const notUndefined = anyValue => typeof anyValue !== 'undefined'
                let resdropdown = results.map((item, i) => {
                    if (item.nameOfInvestigator !== '') return { label: item.nameOfInvestigator, value: item.id }
                    else return;
                }).filter(notUndefined)
                console.log(resdropdown)
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: resdropdown,
                    message: label.LABEL_SUCCESS,
                });
            }).catch((error) => {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    message: error
                });
            })

        } catch (err) {
            console.log(err, 'err');
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    const ProposalWithdrawalOfMDA = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var ProposalWithdrawalOfMDADao = await MDAReportDao.ProposalWithdrawalOfMDADao(req)

            if (ProposalWithdrawalOfMDADao.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: ProposalWithdrawalOfMDADao.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: ProposalWithdrawalOfMDADao.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }
    
    return {

        postMDAEvalListDropdown,
        get_MDATrainingStatus1,
        coverageReport1,
        infrastructure,
        analysis1_postMDAEvaluation,
        analysis2_postMDAEvaluation,
        get_Co_ordinationCommitteReport,
        DrugRequirementMDA1,
        DrugRequirementMDA2,
        DrugStockAtPHC,
        DrugAdminSupervisorAvailability,
        PhcHrAndTrainingStatus,
        PHCwiseDrugConsumption,
        BifurcationOfRegularAndMopup,
        ExpenditureBalanceReceivedFunds,
        ProposalWithdrawalOfMDA

    };
};
export default MDAReportController();