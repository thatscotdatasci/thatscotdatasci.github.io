---
title: Domain Generalisation for Robust Model-Based Offline Reinforcement Learning
website: downloads/Domain_Generalisation_for_Robust_Model_Based_Offline_RL.pdf
date-from: 2022-08-01
image: /assets/images/portfolio/domain_generalisation_for_robust_model_based_offline_rl.png
technologies: [ python, tensorflow, cambridge_mlmi ]
---

My thesis for the [MPhil in Machine Learning and Machine Intelligence](https://www.mlmi.eng.cam.ac.uk/) at the University of Cambridge.

When learning to complete a task, online Reinforcement Learning (RL) techniques typically require hundreds-of-thousands or millions of interactions with the environment. In many scenarios, however, this is likely to be too dangerous or too expensive. Offline RL methods attempt to learn using static datasets, without any further interaction with the real environment. A subset of offline methods are those which learn a model of the environment from the static data, with which an RL agent can interact safely. However, such techniques frequently fail due to _distributional shifts_ - rapid deterioration in model performance when used outside of the training distribution. I applied the Risk Extrapolation (REx - [Arxiv](https://arxiv.org/abs/2003.00688)) domain-generalisation technique in an attempt to improve the out-of-distribution performance of environment models. This was observed to improve agent training in certain cases, especially when used in concert with uncertainty quantification techniques.

My thesis can be downloaded [here](downloads/Domain_Generalisation_for_Robust_Model_Based_Offline_RL.pdf).
