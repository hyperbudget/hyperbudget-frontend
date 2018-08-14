import moment from "moment";
import * as React from 'react';
import { Link } from "react-router-dom";

interface StatementMonthSelectorProps {
    currentlyViewing: Date;
};

export const StatementMonthSelectorComponent = (props: StatementMonthSelectorProps) => {
    const selectedMoment = moment(props.currentlyViewing);
    const prevDate = selectedMoment.clone().subtract(1, 'months').format('YYYYMM');
    const nextDate = selectedMoment.clone().add(1, 'months').format('YYYYMM');

    const currentMonth = moment().format('YYYYMM');

    return (
    <>
        <div className='clearfix mt-5'>
            <div className='float-left'>
                <Link id='previousPeriod' className='btn-outline-primary btn' role='button' to={`/report/${prevDate}`}>Previous period</Link>
            </div>
            <div className='float-right'>
                <Link id='nextPeriod' className='btn-outline-primary btn' role='button' to={`/report/${nextDate}`}>Next period</Link>
            </div>
        </div>

        <div className="text-center">
            <Link className='btn-outline-primary btn' role='button' to={`/report/${currentMonth}`}>This month</Link>
        </div>

        <div className="text-center mt-2">
            <h1>Currently viewing: { selectedMoment.format('MMM YYYY') }</h1>
        </div>
    </>
    );
}
