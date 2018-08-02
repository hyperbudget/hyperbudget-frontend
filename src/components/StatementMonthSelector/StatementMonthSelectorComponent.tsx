import moment, { Moment } from "moment";
import * as React from 'react';
import { Link } from "react-router-dom";

interface StatementMonthSelectorProps {
    currently_viewing: Moment;
};

export const StatementMonthSelectorComponent = (props: StatementMonthSelectorProps) => {
    const current_month: string = moment().format('YYYYMM');
    const prev_date = props.currently_viewing.clone().subtract(1, 'months').format('YYYYMM');
    const next_date = props.currently_viewing.clone().add(1, 'months').format('YYYYMM');

    return (
    <>
        <div className='clearfix mt-5'>
            <div className='float-left'>
                <Link id='previousPeriod' className='btn-outline-primary btn' role='button' to={`/report/${prev_date}`}>Previous period</Link>
            </div>
            <div className='float-right'>
                <Link id='nextPeriod' className='btn-outline-primary btn' role='button' to={`/report/${next_date}`}>Next period</Link>
            </div>
        </div>

        <div className="text-center">
            <Link className='btn-outline-primary btn' role='button' to={`/report/${current_month}`}>This month</Link>
        </div>

        <div className="text-center mt-2">
            <h1>Currently viewing: { props.currently_viewing.format('MMM YYYY') }</h1>
        </div>
    </>
    );
}