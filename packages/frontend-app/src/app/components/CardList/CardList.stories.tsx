import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { CardList } from "./CardList";

import { Card } from "../Card/Card";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CardList> = {
  title: "Card Lists",
  component: CardList,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center">
        <Router>
          <Story />
        </Router>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CardList>;

export const BaseContainer: Story = {
  render: ({ ...rest }) => (
    <CardList {...rest}>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
      <li className="w-[350px]">
        <Card
          src="https://images.prismic.io/wunderflatscontent/ef754f0d-5903-40b7-a1d6-ea143f480f37_Balcony-M.jpg?auto=compress,format"
          title="My God Is Still The Same"
          owner="Sanctus Real"
          link="#"
        />
      </li>
    </CardList>
  ),
  args: {
    title: "Gospel",
  },
};
