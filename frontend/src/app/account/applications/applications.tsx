"use client";

import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "@/app/globals.css";

import { getApplications } from "@/api/applications";
import { useQuery } from "@tanstack/react-query";
import { Button, Table, Link} from "@trussworks/react-uswds";
import NextLink from "next/link";

export const Applications = () => {
  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  const handleDelete = (applicationId: string) => {
    console.log("Deleting " + applicationId);
  }
  const handleNewApplication = () => {
    console.log("New Application")
  }

  return (
    <div>
      <h1>My Applications</h1>
      <h2>Your Applications</h2>
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : applications.length === 0 ? (
          <p>You don&#39;t have any in-progress applications.</p>
        ) : <><Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Manage</th>
                  <th>Status</th>
                  <th>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <th scope="row">
                      {`${application.data.givenName ?? ""} ${application.data.surname ?? ""}`}
                    </th>
                    <td>
                      {application.data.visaType ?? "Not specified"}
                    </td>
                    <td>
                      <Link href={`/application/${application.id}/names`} asCustom={NextLink}>Edit</Link>
                      {` `}
                      <Link onClick={handleDelete}>Delete</Link>
                    </td>
                    <td>
                      Incomplete
                    </td>
                    <td>
                      {application.lastModifiedAt?.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table><Link onClick={handleNewApplication}>
                <Button type="button" accentStyle="warm">
                  Add Application
                </Button>
              </Link></>
      }
      <h2>Applications for someone else</h2>
      <p>You don&#39;t have any in-progress applications.</p>
      <Link onClick={handleNewApplication}>
                <Button type="button" accentStyle="warm">
                  Add Application
                </Button>
              </Link>
    </div>
    );
  }
export default Applications;
