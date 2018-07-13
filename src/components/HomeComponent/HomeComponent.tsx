import * as React from "react";
import './HomeComponent.css';

export class HomeComponent extends React.Component {
    render() {
        return (
            <>
                <div className='home'>
                    <div className='home-text'>
                        <h1 className='d-none d-sm-block'>Hyperbudget</h1>

                        <div className='text'>
                            <h5>Budgeting for the extremely caffeinated.</h5>

                            <p>
                                We have a mission to make your bank statements more understandable. Our personally configurable algorithms and spend reports
                                help you understand your spending day-by-day.
                            </p>

                            <p>
                                You can categorise your transactions, create a custom calendar view, and more. Your data is encrypted with a password of
                                your choice so that nobody else - not even we - can see it.
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
