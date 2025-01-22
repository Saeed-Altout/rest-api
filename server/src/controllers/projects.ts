import express from "express";
export const getProjects = async (req: express.Request, res: any) => {
  try {
    console.log(req.headers);

    // if (!accessToken) {
    //   return res.status(401).json({
    //     status: "error",
    //     code: "401",
    //     message: "Unauthorized: No access token found",
    //   });
    // }

    const projects = [
      {
        id: "1",
        name: "Project 1",
        description: "Description 1",
        image: "https://via.placeholder.com/150",
      },
      {
        id: "2",
        name: "Project 2",
        description: "Description 2",
        image: "https://via.placeholder.com/150",
      },
      {
        id: "3",
        name: "Project 3",
        description: "Description 3",
        image: "https://via.placeholder.com/150",
      },
    ];
    return res.status(200).json({
      status: "success",
      code: "200",
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: "500",
      message: "Internal server error",
    });
  }
};
