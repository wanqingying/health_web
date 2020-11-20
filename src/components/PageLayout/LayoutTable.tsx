import React from "react";
import styled from "styled-components";

export const LayoutTable = styled.div`
  margin: 0;
  height: 100%;
  background-color: #fff;
  padding: 24px;
  overflow: auto;
  .lay-header {
    margin-bottom: 24px;
    .f-item {
      display: inline-block;
    }
    .f-input {
      width: 300px;
      margin-right: 24px;
    }
  }
  .lay-table {
    .btn-act {
      button:first-child {
        margin-right: 10px;
      }
    }
  }
`;
