from os.path import dirname
from os.path import join
import setuptools


def readme() -> str:
    """Utility function to read the README file.
    Used for the long_description.  It's nice, because now 1) we have a top
    level README file and 2) it's easier to type in the README file than to put
    a raw string in below.

    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: content of README.md
    """
    return open(join(dirname(__file__), "readme.md")).read()


setuptools.setup(
    name="streamlit-antd-components",
    version="0.3.2",
    author="jihaoran",
    description="streamlit customer components of Antd Design and Mantine",
    long_description=readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/nicedouble/StreamlitAntdComponents",
    packages=setuptools.find_packages(),
    include_package_data=True,
    python_requires=">=3.8",
    install_requires=[
        "streamlit >= 1.12.0",
    ],
)
