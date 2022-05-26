import React from "react"
export const ScorePage = () => {
    return (
        <div className="box is-flex is-flex-direction-column is-align-items-center">
            <div className="parent">
                <img className="image1 is-rounded" src="https://forintfinance.com/images/team/giuliano_n.jpg" alt="winner-img" />
                <img className="image2 is-rounded is-hidden-fullhd " src="https://wyrmbergames.files.wordpress.com/2018/05/credicor.jpg" alt="credicor" />
            <div className="is-flex is-justify-content-space-between">
                <div>
                    <p className="is-size-3">{"Giuliano Neroni"}</p>
                    <p className="is-size-6">{"as Credicor"}</p>
                </div>
                <div>
                    <p className="is-size-1">{"76"}</p>
                </div>
            </div>
            </div>
            
        </div>
    );
}