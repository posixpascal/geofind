import React from "react";
import {Swipes} from "./Swipes";

describe("<Swipes />", () => {
    it("renders correctly", () => {
        // see: https://on.cypress.io/mounting-react
        const swiper = (
            <Swipes
                title={"Cypress Swiper"}
                readOnly={false}
                onChange={() => {
                }}
                defaultSlide={0}
            >
                <div>Hello</div>
                <div>World</div>
            </Swipes>
        );

        cy.mount(swiper);
        cy.wait(300);
        cy.get("[data-cy=next]").should("exist");
        cy.get("[data-cy=next]").click();
        cy.wait(300);
        cy.get("[data-cy=prev]").should("exist");
        cy.get("[data-cy=prev]").click();
        cy.get("[data-cy=next]").should("exist");

        cy.contains("Cypress Swiper");
        cy.contains("Hello");
        cy.contains("World");
    });

    it("renders in readonly", () => {
        const swiper = (
            <Swipes
                title={"Cypress Swiper"}
                readOnly={true}
                onChange={() => {
                }}
                defaultSlide={0}
            >
                <div>Hello</div>
                <div>World</div>
            </Swipes>
        );

        cy.mount(swiper);
        cy.get("[data-cy=next]").should("not.exist");
        cy.get("[data-cy=prev]").should("not.exist");
    });

    it("updates the state correctly", () => {
        const onChangeSpy = cy.spy().as("onChangeSpy");
        const swiper = (
            <Swipes
                title={"Cypress Swiper"}
                readOnly={false}
                onChange={onChangeSpy}
                defaultSlide={0}
            >
                <div>Hello</div>
                <div>World</div>
            </Swipes>
        );

        cy.mount(swiper);
        cy.wait(300);
        cy.get("@onChangeSpy").should("not.have.been.calledWith", 0);
        cy.get('[data-cy=next]').click();
        cy.wait(300);
        cy.get('@onChangeSpy').should("have.been.calledWith", 1);
        cy.get('[data-cy=prev]').click();
        cy.wait(300);
        cy.get('@onChangeSpy').should("have.been.calledWith", 0);
    });

    it("renders many elements and handle their events correctly", () => {
        const onChangeSpy = cy.spy().as("onChangeSpy");
        const swiper = (
            <Swipes
                title={"Cypress Swiper"}
                readOnly={false}
                onChange={onChangeSpy}
                defaultSlide={0}
            >
                <div>
                    1
                </div>
                <div>
                    2
                </div>
                <div>
                    3
                </div>
                <div>
                    4
                </div>
            </Swipes>
        );

        cy.mount(swiper);
        cy.get('@onChangeSpy').should("have.been.calledWith", 0);
    });
});
