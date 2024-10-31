/**
 * Wordpress Dependencies
 */
import { lazy } from "@wordpress/element";

import {
    Outlet,
    createHashRouter,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import {
    ONBOARDING_PATH,
    ANALYTICS_PATH,
    CAMPAIGN_PATH,
    TEMPLATES_PATH,
    SETTINGS_PATH,
    ABTESTING_PATH,
    EDIT_CAMPAIGN_PATH,
    INTEGRATION_PATH,
    SUBMISSIONS_PATH,
} from "./routeDefinition";

const ErrorPage = lazy(() => import("../components/ErrorPage"));
const Onboarding = lazy(() => import("../pages/onboarding"));
const Analytics = lazy(() => import("../pages/analytics"));
const Campaign = lazy(() => import("../pages/campaign"));
const AdminLayout = lazy(() => import("../components/AdminLayout"));
const Templates = lazy(() => import("../pages/templates"));
const Settings = lazy(() => import("../pages/settings"));
const AbTesting = lazy(() => import("../pages/abTesting"));
const EditCampaign = lazy(() => import("../pages/editCampaign"));
const Integration = lazy(() => import("../pages/integration"));
const Submissions = lazy(() => import("../pages/submissions"));

const { applyFilters } = wp.hooks;

const routerList = [
    {
        path: ONBOARDING_PATH,
        element: <Onboarding />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            { path: CAMPAIGN_PATH, element: <Campaign /> },
            {
                path: ABTESTING_PATH,
                element: <AbTesting />,
            },
            {
                path: ANALYTICS_PATH,
                element: <Analytics />,
            },
            {
                path: TEMPLATES_PATH,
                element: <Templates />,
            },
            {
                path: INTEGRATION_PATH,
                element: <Integration />,
            },
            {
                path: SETTINGS_PATH,
                element: <Settings />,
            },
            {
                path: SUBMISSIONS_PATH,
                element: <Submissions />,
            },
        ],
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        children: [{ path: EDIT_CAMPAIGN_PATH, element: <EditCampaign /> }],
        errorElement: <ErrorPage />,
    },
];

const routerFilter = applyFilters("poptics_router", routerList, {
    Outlet,
    useNavigate,
    useSearchParams,
    useParams,
    ErrorPage,
});

const router = createHashRouter(routerFilter);

export default router;
