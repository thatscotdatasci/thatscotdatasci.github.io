---
title: Weight Uncertainty in Neural Networks
website: downloads/Weight_Uncertainty_in_Neural_Networks.pdf
date-from: 2022-03-02
image: /assets/images/portfolio/weight_uncertainty_in_neural_networks.png
technologies: [ python, pytorch, cambridge_mlmi ]
github-repo: https://github.com/Cambridge-Uni-MLMI-Advanced-ML-21-22-G7
---

This project was conducted for the Advanced Machine Learning module of the [MPhil in Machine Learning and Machine Intelligence](https://www.mlmi.eng.cam.ac.uk/) at the University of Cambridge.

In their 2015 paper ([Arxiv](https://arxiv.org/abs/1505.05424v2)), Blundell et al. proposed the _Bayes by Backprop_ algorithm for performing Bayesian inference on the weights of a Neural Network. Rather than point estimates, posterior distributions are learned for the weights. The goal of training is thus to learn distributions that make correct and confident decisions in regions of input space observed during training, whilst expressing appropriate uncertainty in unfamiliar regions. We replicated the algorithm and experiments presented by Blundell et al. using PyTorch, and additionally explored the classification accuracy of adversarial MNIST examples (generated using the fast gradient sign method proposed by Goodfellow et al., [Arxiv](https://arxiv.org/abs/1412.6572)), finding that Bayesian Neural Networks (BNN) were consistently and significantly more robust than DNNs across various perturbation magnitudes.

The report, which achieved a score > 70 %, can be downloaded [here](downloads/Weight_Uncertainty_in_Neural_Networks.pdf).
