import { useEffect } from 'react';
import { addLog } from '../data/LogsData';
import { Award, Users, Leaf, QrCode, Camera, BookOpen } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function AboutPage() {
  useEffect(() => {
    addLog({ action: 'page_view', page: 'about' });
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <div className="bg-green-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <BackButton to="/" label="Back to Home" className="text-green-100 hover:text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-white mb-4">About Our MIFGS Participation</h1>
            <p className="text-green-100 text-xl max-w-3xl mx-auto">
              Kangan Institute's involvement in the Melbourne International Flower and Garden Show
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
              <Award className="w-8 h-8 text-green-700" />
            </div>
            <div>
              <h2 className="text-green-800 mb-4">Our MIFGS Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Melbourne International Flower and Garden Show (MIFGS) is one of Australia's premier 
                horticultural events, attracting thousands of visitors each year. Kangan Institute's Horticulture 
                program is proud to participate, showcasing the exceptional work of our students and demonstrating 
                excellence in horticultural education.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our participation provides students with real-world experience in plant cultivation, display design, 
                and public engagement, preparing them for successful careers in the horticulture industry.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Leaf className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-gray-900">Student-Led Projects</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our horticulture students take ownership of plant cultivation from seed to display. 
              Each student selects, grows, and documents native Australian plants, creating comprehensive 
              biographies that educate visitors about local flora.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <QrCode className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-gray-900">Digital Integration</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Using QR codes, we bridge traditional gardening with modern technology. Visitors can scan 
              codes to access detailed plant information, care instructions, and learn about indigenous 
              seasons - all documented by our students.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Camera className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-gray-900">Growth Documentation</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Students photograph and track plant development throughout the growing season, creating 
              visual records that demonstrate horticultural knowledge and attention to plant care. 
              This documentation becomes part of their professional portfolio.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-yellow-700" />
              </div>
              <h3 className="text-gray-900">Indigenous Knowledge</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We incorporate indigenous Australian perspectives on seasonal patterns and plant management. 
              Students learn to classify plants according to the six traditional seasons, honoring the deep 
              connection between indigenous culture and the land.
            </p>
          </div>
        </div>

        {/* Educational Outcomes */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-green-800">Educational Outcomes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-900 mb-3">For Students</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Hands-on experience with native plant cultivation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Development of research and documentation skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Public speaking and engagement opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Portfolio building for future employment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Understanding of indigenous ecological knowledge</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 mb-3">For Visitors</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Learn about Australian native plants and their care</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Discover indigenous seasonal classifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Access digital plant information via QR codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>See the results of vocational education excellence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 mt-1">•</span>
                  <span>Connect with sustainable gardening practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Kangan */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-12 border-2 border-green-200">
          <h2 className="text-green-800 mb-4">About Kangan Institute</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kangan Institute is one of Melbourne's largest training providers, with a proud history spanning 
            over 80 years. We deliver innovative, industry-relevant training across a wide range of disciplines, 
            including horticulture, automotive, fashion, health, and more.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Horticulture program combines traditional horticultural knowledge with contemporary practices, 
            preparing students for careers in:
          </p>
          <div className="grid md:grid-cols-2 gap-3 text-gray-700">
            <div>• Parks and Gardens Management</div>
            <div>• Landscape Construction</div>
            <div>• Nursery Operations</div>
            <div>• Arboriculture</div>
            <div>• Sustainable Land Management</div>
            <div>• Urban Greening Projects</div>
          </div>
        </div>

        {/* MIFGUS Logos */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-gray-900 mb-4">Proudly Partnered With</h3>
            <img 
              src="https://melbflowershow.com.au/wp-content/uploads/2024/09/logo-footer.png" 
              alt="Melbourne International Flower And Garden Show."
              className="h-20 object-contain mx-auto mb-4"
            />
            <a
              href="https://melbflowershow.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors"
            >
              Visit MIFGS Website
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-gray-900 mb-4">Delivered By</h3>
            <img 
              src="https://www.kangan.edu.au/wp-content/uploads/2019/11/Kangan-Institute-Logo.png"
              alt="Kangan Institute"
              className="h-20 object-contain mx-auto mb-4"
            />
            <a
              href="https://www.kangan.edu.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
            >
              Visit Kangan Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}