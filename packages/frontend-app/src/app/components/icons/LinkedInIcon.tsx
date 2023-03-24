import React from "react";

interface IProps {
  size?: number;
}

export const LinkedInIcon: React.FC<IProps> = ({ size = 20 }) => {
  return (
    <svg
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 60 60"
    >
      <image
        width="60"
        height="60"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMbSURBVHgB7ZpNdtMwEMdnpNQvbRf4COYG7QXa+AQcIeE9yGPXcAKSE1B2vLIgPUHLCRzCBcIJ6hvgBZTUwRpGTtmkSaQUvzpW/NvkwyPbf1vSfEgIjN+J/NRrnAFRDxB8cIsYUIzU3WwwHYYxNjtRIDwZ8YEA3Cb20uxYsNg+uC9WE6Se6An+cgo7A55pwQHsDr6AHaMW7DqNDWwTRLrMlJoAad8GgQTZJoQWVAg7wQixwiycfgzjhSPD/W7UQ5DvoSJYdekVYnN+X4TnBNlbqAhmwQjDVWL/oUXzRwIVwChYZdklWIBEVnZlU9gszZOXG29YCNvsCQOoABZjeO8F2FGJmNwsmFSn+SpqrTM56H57BxWJya3GsBDy6vD1uLPs2GF3zD6Y+lAR8KA7JmtjghEhfVWkYikaR6SoXbUKySahJczDSGwJlFwNIu2jK0edPGwRCXejGAFz/85DKSjC9dkI5gvSh/Um+Y20l/x/zbHa95WtCHxCPFu8lhJqaTjr9yJ/+hOOhBAdbt2GR2AzacW3FyfP1xlot8UzefTg5AQvf306Ga5s94YrpkrezH/RpXegesl5aBWx5W2Jr0mbucMtGcM0uL047diK1ege4N1lx/xYJ7AB5QvmbIzF9uERJMMw8dI/IWyQqZUquDmFhHPtAfwHWrQi+3y81Fla3ywUkEc3Z3CdeqCrLsYgyAk/PH9w9MXGdqv88HxRD1qK3ZXg/FqlMNELYDZtFeGI2xhd1da8YZ2EpJ78ASCvOHT9nH968uY+EzMiIbOarbdCsBbFwUBv+VHqm9JTzd6MS8cWlC5YL9ea0kuJDeNbvp8AjZQuWO7JlsmG42ijTW4H5re8BV2ajmysdCgJBVC6YAIMbOwyUUyhoXTBXEN4ZmMnU0cEPzW1YNepBbtOLdh1asGuUwt2nVqw6+ycYMsFcYrNNhg8bMY1Z6T1pRdC32pR3eZcy+5hAcsyrflEy5tpIegbbIo7lwX1GHadnRRciS2DhYAQC/N2BqcYCS9V51o5uM58k/tA5AvKmIV6j4WjwvVS6sDbz471Nom/G4QUvOE33yAAAAAASUVORK5CYII="
      />
    </svg>
  );
};
