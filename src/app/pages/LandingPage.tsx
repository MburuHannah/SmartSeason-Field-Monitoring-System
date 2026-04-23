import { useNavigate } from "react-router";
import { Sprout, BarChart3, Users, MapPin, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <Sprout className="w-6 h-6 text-green-700" />
              </div>
              <span className="text-xl text-green-700">SmartSeason</span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm text-green-700 hover:bg-green-50 rounded-md transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-gray-900 mb-6">
            SmartSeason Field Monitoring System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Track crop progress across multiple fields during growing seasons. Empower
            coordinators and field agents with real-time insights and streamlined field
            management.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-900 mb-4">Features & Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to monitor and manage agricultural fields efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg mb-2">Field Tracking</h3>
              <p className="text-sm text-gray-600">
                Monitor multiple fields with detailed location and crop information
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <BarChart3 className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg mb-2">Progress Monitoring</h3>
              <p className="text-sm text-gray-600">
                Track crop stages from planting to harvest with real-time updates
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg mb-2">Agent Management</h3>
              <p className="text-sm text-gray-600">
                Assign field agents and manage their access and responsibilities
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Sprout className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg mb-2">Smart Alerts</h3>
              <p className="text-sm text-gray-600">
                Automatic risk detection based on field updates and observations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-gray-900 mb-6">About SmartSeason</h2>
              <p className="text-gray-600 mb-4">
                SmartSeason Field Monitoring System is designed to help agricultural
                coordinators and field agents efficiently track and manage crop progress
                across multiple fields during growing seasons.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform provides real-time field monitoring, automated risk detection,
                and comprehensive reporting tools that enable better decision-making and
                improved crop yields.
              </p>
              <p className="text-gray-600">
                Whether you're managing a small farm or coordinating operations across
                multiple locations, SmartSeason gives you the tools you need to succeed.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700">1</span>
                  </div>
                  <div>
                    <h4 className="text-sm mb-1">Create Fields</h4>
                    <p className="text-sm text-gray-600">
                      Coordinators set up fields with crop types and locations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700">2</span>
                  </div>
                  <div>
                    <h4 className="text-sm mb-1">Assign Agents</h4>
                    <p className="text-sm text-gray-600">
                      Field agents are assigned to specific fields and units
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700">3</span>
                  </div>
                  <div>
                    <h4 className="text-sm mb-1">Track Progress</h4>
                    <p className="text-sm text-gray-600">
                      Agents update field stages and add observations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700">4</span>
                  </div>
                  <div>
                    <h4 className="text-sm mb-1">Monitor & Respond</h4>
                    <p className="text-sm text-gray-600">
                      System alerts on at-risk fields for quick action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-6">Ready to Get Started?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Start monitoring your fields today with SmartSeason Field Monitoring System
          </p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center px-8 py-3 bg-white text-green-700 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Login to Your Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 SmartSeason Field Monitoring System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
